import { colors, sizes } from "./styleguide";

const reset = `
html {
    box-sizing: border-box;
    font-size: ${parseInt(sizes.base) * 1}em;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  body {
    padding: 0;
    margin: 0;
    font: normal normal normal 100% / 1.5em "Helvetica Neue", Arial;
    color: ${colors.fontColor};
    cursor: default;
  }
  h1,h2,h3,h4,h5 {
      margin: 0;
  }
`;

export const globalStyles = `
${reset}
@font-face {
  font-family: HandelGotDBol;
  src: url("/HandelGotDBol.ttf") format("opentype");
}
strong {
    font-family: HandelGotDBol;
    font-weight: 500;
}
.content {
    max-width: ${sizes.container};
    margin: auto;
    width: 100%;
}
.strong-500 {
    font-weight: 500;
}
.font-21 {
    font-size: 1.31rem;
}
.margin-b-4 {
    margin-bottom: 4rem;
}
.position-relative {
    position: relative;
}
.text {
    &-left {
        text-align: left;
    }
    &-center {
        text-align: center;
    }
    &-right {
        text-align: right;
    }
    @media screen and (max-width: 48em) {
        &-left-xs {
            text-align: left;
        }
        &-center-xs {
            text-align: center;
        }
        &-right-xs {
            text-align: right;
        }
    }
    &-green {
        color: ${colors.green};
    }
    &-red {
        color: ${colors.red};
    }
    &-blue {
        color: ${colors.blue};
    }
}
.font-family-HandelGotDBol {
    font-family: HandelGotDBol;
}
h1 {
    font-family: HandelGotDBol;
    font-size: ${sizes.xxxl};
    line-height: 2.8em;
    font-weight: 500;
}
h2 {
    font-family: HandelGotDBol;
    font-size: ${sizes.xxxl};
    line-height: 2.8em;
    font-weight: 500;
}
h3 {
    font-family: HandelGotDBol;
    font-size: ${sizes.xl};
    line-height: 1.2105em;
    font-weight: 500;
}
h4 {
    font-size: ${sizes.xl};
    line-height: 1.2105em;
    font-weight: normal;
    font-family: serif;
}
h5 {
    font-size: ${sizes.lg};
    line-height: 1.1904em;
    font-weight: normal;
    font-family: serif;
}
.logo {
    font-size: 1.875em;
}
a {
    color: ${colors.blue}
    text-decoration: underline;
    &:visited {
        color: ${colors.blue}
    }
    &:hover {
        text-decoration: none;
    }
}
p {
    margin: 1rem 0;
    line-height: 1.875em;
}
.flex {
    display: flex;
}
.display-block {
    display: block;
}
.text {
    &-white {
        color: ${colors.White};
    }
}
.bg {
    &-grey {
        background: ${colors.grey}
    }
    &-red {
        background: ${colors.red}
    }
    &-blue {
        background: ${colors.blue}
    }
    &-green {
        background: ${colors.green}
    }
    &-dark-blue {
        background: ${colors.darkBlue}
    }
    &-yellow {
        background: ${colors.yellow}
    }
    &-darkest-blue {
        background: ${colors.darkestColor}
    }
}
button, .button {
    text-transform: uppercase;
    border: none;
    background: linear-gradient(72deg, #FFB300 0%, #E02235 100%);
    height: 3.125em;
    line-height: 3em;
    border-radius: 5px;
    transition: all 0.15s ease;
    min-width: 15.625em;
    cursor: pointer;
    text-decoration: none;
    display: inline-block;
    text-align: center;
    color: ${colors.White};
    text-transform: capitalize;
    &:hover {
        background: linear-gradient(72deg, #FFB300 0%, #E02235 20%);
        color: ${colors.White};
    }
    &:active {
        color: #ffffff;
    }
    &.red {
        background: ${colors.red};
    }
    &.blue {
        background: ${colors.blue};
    }
    &.green {
        background: ${colors.green};
    }
    &.border-radius-0-10 {
        border-radius: 0 10px 10px 0;
    }
    &.action {
        border: none;
        box-shadow: inset 0 0 0 1px #06033D;
        border-radius: 25px;
        background: none;
        color: #06033D;
        text-transform: capitalize;
        &:hover {
            box-shadow: none;
            color: white;
            background: transparent linear-gradient(84deg, #FFB300 0%, #E02235 100%) 0% 0% no-repeat padding-box;
        }
        &.white {
            color: #fff;
            box-shadow: inset 0 0 0 1px #fff;
            &:hover {
                box-shadow: none;
            }
        }
        &.ellipse {
            text-align: left;
            background: url("/Icon feather-external-link.svg");
            background-repeat: no-repeat;
            background-position: calc(100% - 20px) center;
            background-size: 15px;
            padding: 0 4em 0 1.5em;
            position: relative;
            &:hover {
                box-shadow: none;
                color: white;
                &:after {
                    height: 100%;
                    border-radius: 25px;
                    background: transparent linear-gradient(84deg, #FFB300 0%, #E02235 100%) 0% 0% no-repeat padding-box;
                    content: "Disconnect";
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    text-align: center;
                }
            }
        }
    }
    &.blue-button {
        background: none;
        border: none;
        box-shadow: none;
        text-decoration: underline;
        color: #36A9E1;
    }
}
.button.button-secondary {
    border-color: ${colors.White};
    color: ${colors.White};
    background: ${colors.Dark1};
    &:hover {
        color: ${colors.Dark1};
        background: ${colors.Yellow};
    }
}
.close-button {
    width: 41px;
    min-width: auto;
    margin-right: 1rem;
}
.inactive-button, .disabled-button {
    pointer-events: none;
}
.disabled-button {
    opacity: 0.2;
}
.b-r-0-10-10-0 {
    border-radius: 0 10px 10px 0;
}
.b-r-10-0-0-10 {
    border-radius: 10px 0 0 10px;
}
.p-10 {
    padding: 10px;
}
.padding-0-1 {
    padding: 0 1rem;
}
.padding-r-1 {
    padding-right: 1rem !important;
}
.padding-1 {
    padding: 1rem;
}
.progress-message {
    max-width: 400px;
    margin: auto;
    text-align: left;
    background: white;
    border-radius: 10px;
    margin-top: 2rem;
    box-shadow: 0 0 20px rgb(0 0 0 / 20%);
    font-weight: normal;
}
.margin {
    &-top-2 {
        margin-top: 2em;
    }
    &-bottom-1 {
        margin-bottom: 1em;
    }
    &-bottom-2 {
        margin-bottom: 2em;
    }
    &-bottom-3 {
        margin-bottom: 3em;
    }
    &-right-2 {
        margin-right: 2em;
    }
}
.text-transform {
    &-auto {
        text-transform: initial;
    }
}
.info-icon {
    height: 16px;
    width: 16px;
    background: url(/info-icon.svg) center no-repeat;
    display: inline-block;
    background-size: contain;
    position: relative;
    top: 3px;
    cursor: pointer;
}
.opacity-0 {
    opacity: 0;
}
.hidden {
    display: none;
}
.text-1 {
    font-size: 1rem;
}
._loading_overlay_wrapper {
    padding-bottom: 6rem;
    padding-top: 1rem;
}
input {
    outline: none;
}
input[type="text"] {
    color: #06033D;
    padding: 0 1rem;
    width: 250px;
    height: 3.125em;
    line-height: 3em;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    border: 1px solid #DDDDDD;
    border-radius: 5px 0px 0px 5px;
}
.dollar-symbol input {
    padding: 0px 1rem 0 2.5rem !important;
}
.disabledBlock {
    opacity: 0.5;
    cursor: not-allowed !important;
    pointer-events: none;
}
.dollar-symbol::after {
    content: "$";
    position: absolute;
    left: 0;
    bottom: 32px;
    width: 30px;
    background: rgb(221, 221, 221);
    height: 50px;
    color: rgb(46, 41, 66);
    line-height: 50px;
    text-align: center;
    border-radius: 5px 0 0 5px;
}
.grey-text {
    font-size: 0.9rem;
    color: #888;
}
.visible-xs {
    display: none;
}
.font-weight {
    &-bold {
        font-weight: bold;
    }
    &-normal {
        font-weight: normal;
    }
}
._loading_overlay_content {
    font-weight: bold;
    font-size: 20px;
}
@media screen and (max-width: 48em) {
    .visible-xs {
        display: inline;
    }
    .hide-xs {
        display: none;
    }
}

.container {
    position: relative;
    margin-top: 15px;
}

.slider {
  position: relative;
  width: 100%;
}

.slider__track,
.slider__range,
.slider__left-value,
.slider__right-value {
  position: absolute;
}

.slider__track,
.slider__range {
  border-radius: 3px;
  height: 5px;
}

.slider__track {
  background-color: #ced4da;
  width: 100%;
  z-index: 1;
}

.slider__range {
  background-color: #5987db;
  z-index: 2;
}

.slider__left-value,
.slider__right-value {
  color: #dee2e6;
  font-size: 12px;
  margin-top: 20px;
}

.slider__left-value {
  left: 6px;
}

.slider__right-value {
  right: -4px;
}

/* Removing the default appearance */
.thumb,
.thumb::-webkit-slider-thumb {
  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;
}
.thumb {
  pointer-events: none;
  position: absolute;
  height: 0;
  width: 100%;
  outline: none;
}

.thumb--zindex-3 {
  z-index: 3;
}

.thumb--zindex-4 {
  z-index: 4;
}

.thumb--zindex-5 {
  z-index: 5;
}

/* For Chrome browsers */
.thumb::-webkit-slider-thumb {
  background-color: #bfc3c9;
  border: none;
  //border-radius: 50%;
  box-shadow: 0 0 1px 1px #ced4da;
  cursor: pointer;
  height: 30px;
  width: 10px;
  margin-top: 4px;
  pointer-events: all;
  position: relative;
}

/* For Firefox browsers */
.thumb::-moz-range-thumb {
  background-color: #f1f5f7;
  border: none;
  border-radius: 50%;
  box-shadow: 0 0 1px 1px #ced4da;
  cursor: pointer;
  height: 18px;
  width: 18px;
  margin-top: 4px;
  pointer-events: all;
  position: relative;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

`;
