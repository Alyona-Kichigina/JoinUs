import HeaderBlock from "./Components/HeaderBlock";
import TextBlock from "./Components/TextBlock";
import VideoBlock from "./Components/VideoBlock";
import PhotoBlock from "./Components/PhotoBlock";
import FormBlock from "./Components/FormBlock";
import QuizBlock from "./Components/QuizBlock";
import SmileBlock from "./Components/SmileBlock";

export const HEADER_TYPE = "HEADER_TYPE"
export const TEXT_TYPE = "TEXT_TYPE"
export const VIDEO_TYPE = "VIDEO_TYPE"
export const PHOTO_TYPE = "PHOTO_TYPE"
export const FORM_TYPE = "FORM_TYPE"
export const QUIZ_TYPE = "QUIZ_TYPE"
export const SMILE_TYPE = "SMILE_TYPE"

export const componentTypeList = {
  [HEADER_TYPE]: HeaderBlock,
  [TEXT_TYPE]: TextBlock,
  [VIDEO_TYPE]: VideoBlock,
  [PHOTO_TYPE]: PhotoBlock,
  [FORM_TYPE]: FormBlock,
  [QUIZ_TYPE]: QuizBlock,
  [SMILE_TYPE]: SmileBlock,
}