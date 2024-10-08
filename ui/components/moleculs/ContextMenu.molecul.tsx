"use client";

import { contextMenuAtom } from "@/lib/atoms/global";
import { useRecoilState, useRecoilValue } from "recoil";

import { AnimatePresence, motion } from "framer-motion";

import "@/ui/styles/moleculs/contextMenu.molecul.scss";
import Button from "../atoms/Button.atom";
import { IoSyncSharp } from "react-icons/io5";
import { LucideDownload, LucideImage } from "lucide-react";
import { useTranslations } from "next-intl";
import { renderAtom } from "@/lib/atoms/generator";
import { ChangeEventHandler, useEffect, useRef } from "react";

export default function ContextMenu({
  handleSave,
  handleImageChange,
  resetModelPosition,
}: {
  handleImageChange: ChangeEventHandler<HTMLInputElement>;
  resetModelPosition: CallableFunction;
  handleSave: CallableFunction;
}) {
  const t = useTranslations("generate");
  const contextRef = useRef<HTMLDivElement | null>(null);

  const [context, setContex] = useRecoilState(contextMenuAtom);
  const render = useRecoilValue(renderAtom);

  return (
    <AnimatePresence>
      {context.shown && (
        <motion.div
          id="context-menu"
          ref={contextRef}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 50,
          }}
          initial={{
            opacity: 0,
            height: 0,
          }}
          animate={{
            opacity: 1,
            height: "fit-content",
          }}
          exit={{
            opacity: 0,
            height: 0,
            transition: { duration: 0.25 },
          }}
          className="context-menu"
          style={{
            top: `${context.position.y}px`,
            left: `${context.position.x}px`,
            display: context.shown ? "flex" : "none",
          }}
        >
          <p>Quick Actions</p>

          <div className="actions">
            <Button variant="editor">
              <p>{t("image.add")}</p>
              <LucideImage />

              <input
                onChange={handleImageChange}
                className="add-file"
                type="file"
                id="avatar"
                name="avatar"
                accept="image/*"
              />
            </Button>

            <Button
              onClick={resetModelPosition}
              variant="editor"
              className="danger  model__reset-cta"
            >
              <p>{t("actions.reset")}</p>
              <IoSyncSharp />
            </Button>
            <Button
              onClick={() =>
                handleSave({
                  type: render.type,
                  w: render.w,
                  h: render.h,
                })
              }
              variant="editor"
              className="download"
            >
              <p>{t("actions.download")}</p>
              <LucideDownload />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
