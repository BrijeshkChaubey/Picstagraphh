import React from "react";
import RNFetchBlob from "rn-fetch-blob";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
const fs = RNFetchBlob.fs;

const saveVideoToGallery = async (videoUrl) => {
  const urlArr = videoUrl.split(".");
  const cache = await RNFetchBlob.config({
    fileCache: true,
    appendExt: urlArr[urlArr.length - 1],
  }).fetch("GET", videoUrl, {});

  const gallery = await CameraRoll.save(cache.path(), "video");
  cache.flush();

  return gallery;
};

const saveImageToGallery = async (imageUrl) => {
  const urlArr = imageUrl.split(".");
  const cache = await RNFetchBlob.config({
    fileCache: true,
    appendExt: urlArr[urlArr.length - 1],
  }).fetch("GET", imageUrl, {});

  const gallery = await CameraRoll.save(cache.path(), "image");
  cache.flush();

  return gallery;
};

const base64Converter = async (url) => {
  let base64 = "";

  await RNFetchBlob.config({
    fileCache: true,
  })
    .fetch("GET", url)
    .then((resp) => {
      base64 = resp.readFile("base64");
    });

  return base64;
};

export { base64Converter, saveVideoToGallery, saveImageToGallery };