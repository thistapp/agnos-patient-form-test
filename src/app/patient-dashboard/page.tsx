"use client";

import { useEffect, useState, useRef } from "react";
import BaseButton from "@/components/baseButtonComponents";
import { useRouter } from "next/navigation";
import { PatientSession } from "@/lib/types/basePatientTypes";
import BaseDisplayComponents from "@/components/baseDisplayComponents";
import { PatientBadge, PatientStatus } from "@/utils/patientStatus";
import { WsStatus } from "@/lib/types/waStatusTypes";

const Page = () => {
  const router = useRouter();
  const [sessions, setSessions] = useState<PatientSession[]>([]);
  const [wsStatus, setWsStatus] = useState<WsStatus>(WsStatus.Connecting);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let socket: WebSocket | null = null;

    const connect = () => {
      setWsStatus(WsStatus.Connecting);
      try {
        socket = new WebSocket("ws://localhost:8080");

        socket.onopen = () => {
          setWsStatus(WsStatus.Connected);
        };

        socket.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            const { sessionId, event: wsEvent, payload } = data;

            if (!sessionId) return;

            setSessions((prev) => {
              const existingIndex = prev.findIndex(
                (s) => s.sessionId === sessionId,
              );

              if (wsEvent === "left") {
                return prev.filter((s) => s.sessionId !== sessionId);
              }

              const updatedSession: PatientSession = {
                sessionId,
                status: wsEvent,
                firstName: payload.firstName || "",
                middleName: payload.middleName || "",
                lastName: payload.lastName || "",
                dateofbirth: payload.dateofbirth || null,
                gender: payload.gender || "",
                phoneNumber: payload.phoneNumber || "",
                email: payload.email || "",
                address: payload.address || "",
                preferredLanguage: payload.preferredLanguage || "",
                nationality: payload.nationality || "",
                religion: payload.religion || "",
                emergencyContactName: payload.emergencyContactName || "",
                emergencyContactPhone: payload.emergencyContactPhone || "",
                emergencyContactRelationship:
                  payload.emergencyContactRelationship || "",
                timestamp: new Date().toLocaleTimeString(),
              };

              if (existingIndex > -1) {
                const updated = [...prev];
                updated[existingIndex] = updatedSession;
                return updated;
              } else {
                return [updatedSession, ...prev];
              }
            });
          } catch (err) {
            // console.error("[Dashboard] Error parsing WebSocket message:", err);
          }
        };

        socket.onclose = () => {
          setWsStatus(WsStatus.Disconnected);
          // console.log(
          // 	"[Dashboard] WebSocket connection closed. Attempting reconnect",
          // );
          reconnectTimeoutRef.current = setTimeout(connect, 3000);
        };

        socket.onerror = () => {
          if (socket) socket.close();
        };
      } catch (e) {
        // console.error("[Dashboard] WebSocket connection failed:", e);
        setWsStatus(WsStatus.Disconnected);
        reconnectTimeoutRef.current = setTimeout(connect, 3000);
      }
    };

    connect();

    return () => {
      if (socket) {
        socket.onclose = null;
        socket.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, []);

  const colorStatus = (session: PatientSession) => {
    switch (session.status) {
      case "typing":
        return "border-blue-400 ring-2 ring-blue-500/10";
      case "inactive":
        return "border-amber-300 bg-amber-50/5";
      case "submitted":
        return "border-emerald-400 ring-2 ring-emerald-500/10 bg-emerald-50/5";
      default:
        return "border-gray-200";
    }
  };

  return (
    <div className="w-full max-w-5xl my-8 px-4 flex flex-col items-center min-h-[85vh]">
      <div className="w-full bg-white shadow-sm border border-gray-200 rounded-xl p-6 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
            Patient Synchronization Dashboard
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Monitor patient form activities, inputs, and statuses in real-time
          </p>
        </div>
        <div className="flex items-center gap-3">
          {PatientBadge(wsStatus)}
          <BaseButton
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer text-gray-700 text-sm font-medium transition"
            onClick={() => router.push("/")}
          >
            Back
          </BaseButton>
        </div>
      </div>

      <div className="w-full flex-1 flex flex-col">
        {sessions.length === 0 ? (
          <div className="flex-1 w-full bg-white shadow-sm border border-gray-200 rounded-xl p-12 flex flex-col items-center justify-center min-h-[400px]">
            <div className="relative mb-6"></div>
            <h3 className="text-lg font-semibold text-gray-800">
              Waiting for live sync sessions...
            </h3>
            <p className="text-sm text-gray-500 text-center max-w-md mt-2">
              Open the
              <span
                className="text-blue-600 font-semibold cursor-pointer underline hover:text-blue-800"
                onClick={() => router.push("/patient-form")}
              >
                {" "}
                Patient Form page{" "}
              </span>
              in a new window, start typing, and you will see your keystrokes
              and status synchronize here in real-time!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 w-full">
            {sessions.map((session) => {
              const hasName = session.firstName || session.lastName;
              return (
                <div
                  key={session.sessionId}
                  className={`w-full bg-white shadow-sm border rounded-xl overflow-hidden transition-all duration-300 ${colorStatus(session)}`}
                >
                  <div className="px-6 py-4 bg-gray-50/80 border-b border-gray-100 flex flex-wrap justify-between items-center gap-4">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                          session.status === "submitted"
                            ? "bg-emerald-100 text-emerald-600"
                            : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        {hasName
                          ? `${session.firstName.charAt(0)}${session.lastName.charAt(0)}`.toUpperCase()
                          : "?"}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 text-base">
                          {hasName ? (
                            `${session.firstName} ${session.middleName ? `${session.middleName} ` : ""}${session.lastName}`
                          ) : (
                            <span className="text-gray-400 font-normal italic">
                              Anonymous Patient
                            </span>
                          )}
                        </h3>
                        <p className="text-[10px] text-gray-400 font-mono -mt-0.5">
                          Session ID: {session.sessionId}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-400 font-mono">
                        Last activity: {session.timestamp}
                      </span>
                      {PatientStatus(session.status)}
                    </div>
                  </div>

                  {/* Content of the Card */}
                  <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Demographics
                      </h4>
                      <div className="space-y-2 text-sm">
                        <BaseDisplayComponents
                          className="flex justify-between py-1 border-b border-gray-100"
                          titleSection="Gender"
                          sessionData={session.gender}
                          placeholder="(Not selected)"
                        />
                        <BaseDisplayComponents
                          className="flex justify-between py-1 border-b border-gray-100"
                          titleSection="Date of Birth"
                          sessionData={session.dateofbirth}
                          placeholder="(Not entered)"
                        />
                        <BaseDisplayComponents
                          className="flex justify-between py-1 border-b border-gray-100"
                          titleSection="Nationality"
                          sessionData={session.nationality}
                          placeholder="(Not selected)"
                        />
                        <BaseDisplayComponents
                          className="flex justify-between py-1 border-b border-gray-100"
                          titleSection="Religion"
                          sessionData={session.religion}
                          placeholder="(Not selected)"
                        />
                      </div>
                    </div>

                    {/* Contact */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Contact & Language
                      </h4>
                      <div className="space-y-2 text-sm">
                        <BaseDisplayComponents
                          className="flex justify-between py-1 border-b border-gray-100"
                          titleSection="Phone"
                          sessionData={session.phoneNumber}
                          placeholder="(Typing...)"
                        />
                        <BaseDisplayComponents
                          className="flex justify-between py-1 border-b border-gray-100"
                          titleSection="Email"
                          sessionData={session.email}
                          placeholder="(Typing...)"
                        />
                        <BaseDisplayComponents
                          className="flex justify-between py-1 border-b border-gray-100"
                          titleSection="Preferred Language"
                          sessionData={session.preferredLanguage}
                          placeholder="(Not selected)"
                        />
                        <BaseDisplayComponents
                          className="flex justify-between py-1"
                          titleSection="Address"
                          sessionData={session.address}
                          placeholder="(Typing...)"
                        />
                      </div>
                    </div>

                    {/* Emergency Contact */}
                    <div
                      className={`space-y-3 p-4 rounded-lg border transition ${
                        session.status === "submitted"
                          ? "bg-emerald-50/50 border-emerald-100"
                          : "bg-blue-50/30 border-blue-100/50"
                      }`}
                    >
                      <h4
                        className={`text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 ${
                          session.status === "submitted"
                            ? "text-emerald-800"
                            : "text-blue-800"
                        }`}
                      >
                        <span>🚨</span> Emergency Contact
                      </h4>
                      <div className="space-y-2.5 text-sm">
                        <BaseDisplayComponents
                          className=""
                          titleSection="Name"
                          sessionData={session.emergencyContactName}
                          placeholder="(Typing...)"
                        />
                        <BaseDisplayComponents
                          className=""
                          titleSection="Phone"
                          sessionData={session.emergencyContactPhone}
                          placeholder="(Typing...)"
                        />
                        <BaseDisplayComponents
                          className=""
                          titleSection="Relationship"
                          sessionData={session.emergencyContactRelationship}
                          placeholder="(Typing...)"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
