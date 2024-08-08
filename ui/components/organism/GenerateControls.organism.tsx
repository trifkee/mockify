"use client";

import { useTranslations } from "next-intl";

import { HexColorPicker } from "react-colorful";
import Slider from "@/ui/components/atoms/Slider.atom";
import Checkbox from "@/ui/components/atoms/Checkbox.atom";
import Button from "@/ui/components/atoms/Button.atom";

import { ENV_LIST, MODELS_LIST, TEXTURE_LIST } from "@/lib/constants/generator";

import {
  IoAdd,
  IoAddCircleSharp,
  IoFlashlight,
  IoImageSharp,
  IoSaveSharp,
  IoSyncSharp,
  IoTrashBinSharp,
} from "react-icons/io5";
import useGenerator from "@/ui/hooks/useGenerator.hook";
import { SceneLightsType } from "@/lib/types/model.type";
import { Fragment } from "react";

export default function GenerateControls() {
  const t = useTranslations("generate");

  const {
    model,
    sceneDocument,
    sceneLights,
    handleImageChange,
    handleChangeColor,
    onChangeIntensity,
    handleChangeModelTexture,
    handleChangeShadow,
    handleDirLightPosition,
    handleSave,
    handleSelectChange,
    resetModelPosition,
    handleAddNewLight,
    handleRemoveLight,
  } = useGenerator();

  return (
    <article className="generate__controls">
      <details className="control image">
        <summary className="control__title">{t("image.title")}</summary>

        <div className="control__section">
          <div className="image-container">
            {!model.image.isDefault ? (
              <img src={model.image.src} alt="model" />
            ) : (
              <>
                <IoImageSharp />
                <p style={{ fontSize: ".75rem" }}>{t("image.noImage")}</p>
              </>
            )}
          </div>

          <Button variant="editor">
            <p>{t("image.add")}</p>
            <IoImageSharp />

            <input
              onChange={handleImageChange}
              className="add-file"
              type="file"
              id="avatar"
              name="avatar"
              accept="image/*"
            />
          </Button>
        </div>
      </details>

      <details className="control model select">
        <summary className="control__title">{t("model.title")}</summary>

        <div className="control__section">
          <p className="title">{t("model.texture.title")}</p>

          <div className="textures">
            {TEXTURE_LIST.map((texture, i) => (
              <Checkbox
                key={i}
                title={t(`model.texture.texture.${texture.name}`)}
                htmlName={texture.name}
                value={texture.name === model.texture}
                onChange={(e) => handleChangeModelTexture(e)}
              />
            ))}
          </div>
        </div>

        <div className="control__section">
          <summary className="title">{t("model.type.title")}</summary>

          <select defaultValue={MODELS_LIST[0].title}>
            {MODELS_LIST.map((model) => {
              return (
                <option key={model.id} value={model.id}>
                  {t(`model.type.types.${model.title.toLowerCase()}`)}
                </option>
              );
            })}
          </select>
        </div>

        <div className="control__section ">
          <p className="title">{t("model.color.title")}</p>
          <HexColorPicker
            color={model.color}
            onChange={(e) => handleChangeColor(e, "model")}
          />
        </div>
      </details>
      <details className="control env select">
        <summary className="control__title">{t("environment.title")}</summary>

        <div className="control__section env select">
          <p className="title">{t("environment.preset")}</p>

          <select
            onChange={(e) => handleSelectChange(e, "env")}
            defaultValue={ENV_LIST[0].title}
          >
            {ENV_LIST.map((env) => {
              return (
                <option key={env.id} value={env.name}>
                  {t(`environment.list.${env.title.toLowerCase()}`)}
                </option>
              );
            })}
          </select>
        </div>

        <div className="control__section env">
          <p className="title">{t("environment.castShadow.title")}</p>

          <Checkbox
            title={t("environment.castShadow.shadow")}
            htmlName="castShadow"
            value={sceneDocument.env.castShadow}
            onChange={(e) => handleChangeShadow(e)}
          />
        </div>

        <div className="control__section env">
          <p className="title">{t("environment.ambientLight.intensity")}</p>

          <Slider
            className=" small env-slider"
            max={1}
            min={0}
            name="intensity"
            step={0.01}
            onChange={(e) => onChangeIntensity(e, "env")}
            value={sceneDocument.env.intensity}
          />
        </div>

        <div className="control__section ">
          <p className="title">{t("environment.ambientLight.color")}</p>
          <HexColorPicker
            color={sceneDocument.env.color}
            onChange={(e) => handleChangeColor(e, "ambient")}
          />
        </div>
      </details>

      <details className="control">
        <summary className="control__title flex">
          <p>
            {t("lights.title")}
            {"  "}
            {sceneLights.length > 0 && (
              <span style={{ fontSize: ".75rem", fontWeight: "lighter" }}>
                {sceneLights.length}
              </span>
            )}
          </p>

          <Button onClick={handleAddNewLight} variant="editor">
            {t("lights.add")} <IoAdd />
          </Button>
        </summary>

        {sceneLights.map((light: SceneLightsType, i: number) => (
          <Fragment key={i}>
            <details className="control__section">
              <summary className="title flex">
                {t("lights.lights.title") + " " + (i + 1)}{" "}
                <Button
                  variant="editor"
                  className="danger"
                  onClick={() => handleRemoveLight(i)}
                >
                  {/* {t("lights.remove")} */}

                  <IoTrashBinSharp />
                </Button>
              </summary>

              <div className="control__section">
                <p className="title">{t("lights.lights.intensity")}</p>
                <Slider
                  className="small env-slider"
                  max={1}
                  min={0}
                  name={t("lights.lights.intensity")}
                  step={0.01}
                  onChange={(e) => onChangeIntensity(e, "dirLights", i)}
                  value={String(light.intensity)}
                />

                <p className="title">{t("lights.lights.position")}</p>
                <div className="position">
                  <input
                    type="number"
                    name="lx"
                    id="lx"
                    onChange={(e) => handleDirLightPosition(e, "x", i)}
                    value={light.position.x}
                  />
                  <input
                    type="number"
                    name="ly"
                    id="ly"
                    onChange={(e) => handleDirLightPosition(e, "y", i)}
                    value={light.position.y}
                  />
                  <input
                    type="number"
                    name="lz"
                    id="lx"
                    onChange={(e) => handleDirLightPosition(e, "z", i)}
                    value={light.position.z}
                  />
                </div>

                <p className="title">{t("lights.lights.color")}</p>
                <HexColorPicker
                  color={light.color}
                  onChange={(e) => handleChangeColor(e, "dirLight", i)}
                />
              </div>
            </details>
            <div className="divider"></div>
          </Fragment>
        ))}
      </details>

      <details className="control">
        <summary className="control__title">{t("actions.title")}</summary>
        <div className="control__section">
          <Button
            onClick={resetModelPosition}
            variant="editor"
            className="danger  model__reset-cta"
          >
            <p>{t("actions.reset")}</p>
            <IoSyncSharp />
          </Button>
          <Button onClick={handleSave} variant="editor" className="download">
            <p>{t("actions.download")}</p>
            <IoSaveSharp />
          </Button>
        </div>
      </details>
    </article>
  );
}
