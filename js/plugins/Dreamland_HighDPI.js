/*:
 * @target MZ
 * @plugindesc Dreamland HiDPI Rendering v3.0
 * @author OpenAI
 *
 * @param Resolution
 * @text 렌더링 배율
 * @type number
 * @min 1
 * @max 3
 * @decimals 1
 * @default 2
 *
 * @help
 * Dreamland HiDPI Rendering v3.0
 *
 * 게임의 논리 해상도는 그대로 유지하면서
 * 실제 PIXI 렌더링 버퍼만 고해상도로 만듭니다.
 *
 * 예:
 * 논리 해상도 : 816 x 624
 * Resolution 2 : 1632 x 1248 렌더링
 *
 * 이 플러그인은 이미지 필터링 방식을 강제로 변경하지 않습니다.
 *
 * 타이틀 / UI / 일러스트:
 * 기본 LINEAR 방식 유지
 *
 * 캐릭터:
 * 별도의 Dreamland_PixelCharacter 플러그인에서
 * NEAREST 방식으로 처리하는 것을 권장합니다.
 */

(() => {
    "use strict";

    const pluginName = (() => {

        const src = document.currentScript
            ? document.currentScript.src
            : "";

        const match =
            src.match(/([^/]+)\.js$/);

        return match
            ? match[1]
            : "Dreamland_HiDPI";
    })();


    const params =
        PluginManager.parameters(
            pluginName
        );


    const RESOLUTION =
        Math.max(
            1,
            Number(
                params["Resolution"] || 2
            )
        );


    // =========================================================
    // PIXI 초기화
    // =========================================================

    const _Graphics_setupPixi =
        Graphics._setupPixi;


    Graphics._setupPixi =
        function() {

            // 중요:
            // PIXI Application이 만들어지기 전에 설정해야 함.
            PIXI.settings.RESOLUTION =
                RESOLUTION;


            // 이미지 확대 방식은 여기서 강제하지 않음.
            // 타이틀/옵션 일러스트가 부드럽게 표시되도록
            // PIXI 기본값을 그대로 사용.
            //
            // 캐릭터만 별도 플러그인에서
            // NEAREST 처리할 예정.


            _Graphics_setupPixi.call(
                this
            );


            // ---------------------------------------------
            // Renderer 생성 후 Resolution 확실히 적용
            // ---------------------------------------------

            if (
                this._app &&
                this._app.renderer
            ) {

                const renderer =
                    this._app.renderer;


                renderer.resolution =
                    RESOLUTION;


                renderer.resize(
                    this._width,
                    this._height
                );
            }
        };


    // =========================================================
    // Canvas 업데이트
    // =========================================================

    Graphics._updateCanvas =
        function() {

            if (!this._canvas) {
                return;
            }


            const canvas =
                this._canvas;


            // ---------------------------------------------
            // PIXI Renderer가 준비된 경우
            // ---------------------------------------------

            if (
                this._app &&
                this._app.renderer
            ) {

                const renderer =
                    this._app.renderer;


                if (
                    renderer.resolution !==
                    RESOLUTION
                ) {

                    renderer.resolution =
                        RESOLUTION;
                }


                // 논리 크기 지정
                //
                // renderer.resolution = 2라면
                // 실제 Canvas 버퍼는 자동으로
                // width * 2 / height * 2가 됨.
                renderer.resize(
                    this._width,
                    this._height
                );

            } else {

                // PIXI 초기화 이전
                canvas.width =
                    Math.round(
                        this._width *
                        RESOLUTION
                    );


                canvas.height =
                    Math.round(
                        this._height *
                        RESOLUTION
                    );
            }


            // =================================================
            // 화면에 실제로 표시되는 CSS 크기
            //
            // 여기서는 Resolution을 곱하면 안 됨.
            // =================================================

            const cssWidth =
                Math.round(
                    this._width *
                    this._realScale
                );


            const cssHeight =
                Math.round(
                    this._height *
                    this._realScale
                );


            canvas.style.position =
                "absolute";


            canvas.style.margin =
                "auto";


            canvas.style.top =
                "0";


            canvas.style.left =
                "0";


            canvas.style.right =
                "0";


            canvas.style.bottom =
                "0";


            canvas.style.width =
                cssWidth + "px";


            canvas.style.height =
                cssHeight + "px";


            canvas.style.zIndex =
                1;


            // 최종 Canvas 자체는 부드럽게 표시
            canvas.style.imageRendering =
                "auto";
        };


    // =========================================================
    // Renderer가 다른 과정에서 resize되어도
    // Resolution을 다시 보정
    // =========================================================

    const _Graphics_updateAllElements =
        Graphics._updateAllElements;


    Graphics._updateAllElements =
        function() {

            _Graphics_updateAllElements.call(
                this
            );


            if (
                this._app &&
                this._app.renderer
            ) {

                const renderer =
                    this._app.renderer;


                if (
                    renderer.resolution !==
                    RESOLUTION
                ) {

                    renderer.resolution =
                        RESOLUTION;


                    renderer.resize(
                        this._width,
                        this._height
                    );
                }
            }
        };

})();