/*:
 * @target MZ
 * @plugindesc Dreamland 2x 고해상도 타이틀 배경 맞춤 v4.0
 * @author OpenAI
 *
 * @help
 * 1632x1248 타이틀 배경을
 * 816x624 논리 화면에 정확히 축소해 표시합니다.
 *
 * MOG_TitleCommands의 Command_0~3 이미지는 건드리지 않습니다.
 *
 * 이 플러그인은 타이틀 관련 플러그인보다 아래에 배치하세요.
 */

(() => {
    "use strict";

    Scene_Title.prototype.adjustBackground = function() {

        const fitBackground = sprite => {

            if (!sprite || !sprite.bitmap) {
                return;
            }

            const applyScale = () => {

                const bitmap = sprite.bitmap;

                if (
                    !bitmap ||
                    bitmap.width <= 0 ||
                    bitmap.height <= 0
                ) {
                    return;
                }

                const screenW = Graphics.width;
                const screenH = Graphics.height;

                const imageW = bitmap.width;
                const imageH = bitmap.height;

                // 이미지 전체가 화면에 들어오도록 축소
                const scale = Math.min(
                    screenW / imageW,
                    screenH / imageH
                );

                sprite.anchor.set(0.5, 0.5);

                sprite.scale.set(
                    scale,
                    scale
                );

                sprite.x = screenW / 2;
                sprite.y = screenH / 2;
            };


            if (sprite.bitmap.isReady()) {

                applyScale();

            } else {

                sprite.bitmap.addLoadListener(
                    applyScale
                );
            }
        };


        // 시스템에서 지정한 Title1 배경
        fitBackground(
            this._backSprite1
        );


        // 시스템 Title2를 실제 배경 레이어로 쓸 경우에만 적용됨.
        // MOG Command_0~3에는 영향 없음.
        if (
            this._backSprite2 &&
            this._backSprite2.bitmap &&
            this._backSprite2.bitmap.width > 0
        ) {

            fitBackground(
                this._backSprite2
            );
        }
    };

})();