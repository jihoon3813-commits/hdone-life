"use client";

import React, { useState, useEffect } from "react";
import { X, ExternalLink } from "lucide-react";

export interface PopupItem {
  id: number;
  title: string;
  content_html?: string;
  image_url?: string;
  link_url?: string;
  width: number;
  height: number;
  top_pos: number;
  left_pos: number;
}

export default function PopupModal() {
  const [popups, setPopups] = useState<PopupItem[]>([]);
  const [closedIds, setClosedIds] = useState<number[]>([]);

  useEffect(() => {
    // Fetch popups from API
    fetch("/api/popups")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.popups) {
          // Filter out those hidden for 24h
          const active = data.popups.filter((p: PopupItem) => {
            const hideUntil = localStorage.getItem(`hide_popup_${p.id}`);
            if (hideUntil && new Date().getTime() < parseInt(hideUntil, 10)) {
              return false;
            }
            return true;
          });
          setPopups(active);
        }
      })
      .catch(() => {});
  }, []);

  const handleClose = (id: number) => {
    setClosedIds((prev) => [...prev, id]);
  };

  const handleHide24h = (id: number) => {
    const expireTime = new Date().getTime() + 24 * 60 * 60 * 1000;
    localStorage.setItem(`hide_popup_${id}`, expireTime.toString());
    setClosedIds((prev) => [...prev, id]);
  };

  const visiblePopups = popups.filter((p) => !closedIds.includes(p.id));

  if (visiblePopups.length === 0) return null;

  return (
    <>
      {visiblePopups.map((popup) => (
        <div
          key={popup.id}
          className="fixed z-50 bg-white rounded-xl shadow-2xl border border-slate-300 overflow-hidden hidden sm:block"
          style={{
            top: `${popup.top_pos}px`,
            left: `${popup.left_pos}px`,
            width: `${popup.width}px`,
            maxHeight: `${popup.height + 60}px`,
          }}
        >
          {/* Header */}
          <div className="bg-slate-900 text-white px-4 py-2 flex items-center justify-between text-xs font-bold">
            <span>{popup.title}</span>
            <button onClick={() => handleClose(popup.id)} className="hover:text-amber-400">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 overflow-y-auto" style={{ height: `${popup.height}px` }}>
            {popup.image_url && (
              <img src={popup.image_url} alt={popup.title} className="w-full h-auto rounded-lg mb-3 object-cover" />
            )}
            {popup.content_html && (
              <div
                className="text-xs text-slate-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: popup.content_html }}
              />
            )}
            {popup.link_url && (
              <div className="mt-3 text-right">
                <a
                  href={popup.link_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-amber-600 font-bold hover:underline"
                >
                  자세히 보기 <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-slate-100 px-4 py-2 flex items-center justify-between text-[11px] text-slate-600 border-t border-slate-200">
            <button onClick={() => handleHide24h(popup.id)} className="hover:text-slate-900 font-medium">
              24시간 동안 보지 않기
            </button>
            <button onClick={() => handleClose(popup.id)} className="hover:text-slate-900 font-bold">
              닫기
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
