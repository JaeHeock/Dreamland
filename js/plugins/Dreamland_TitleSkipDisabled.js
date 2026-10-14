/*:
 * @target MZ
 * @plugindesc 타이틀에서 비활성화된 커맨드를 선택하지 못하게 합니다.
 * @author OpenAI
 *
 * @help
 * 세이브 파일이 없을 때 "이어하기"처럼 비활성화된 커맨드를
 * 키보드 / 게임패드 / 마우스로 선택하지 못하게 합니다.
 *
 * MOG_TitleCommands.js 아래에 배치하세요.
 */

(() => {
    "use strict";

    // ---------------------------------------------------------
    // 기본 타이틀 커맨드의 위/아래 이동에서
    // 비활성화된 항목을 자동으로 건너뜀
    // ---------------------------------------------------------

    Window_TitleCommand.prototype.selectEnabledCommand = function(delta) {
        const max = this.maxItems();

        if (max <= 0) {
            return;
        }

        let index = this.index();

        for (let i = 0; i < max; i++) {
            index = (index + delta + max) % max;

            if (this.isCommandEnabled(index)) {
                this.select(index);
                return;
            }
        }
    };


    Window_TitleCommand.prototype.cursorDown = function(wrap) {
        this.selectEnabledCommand(1);
    };


    Window_TitleCommand.prototype.cursorUp = function(wrap) {
        this.selectEnabledCommand(-1);
    };


    Window_TitleCommand.prototype.cursorRight = function(wrap) {
        this.selectEnabledCommand(1);
    };


    Window_TitleCommand.prototype.cursorLeft = function(wrap) {
        this.selectEnabledCommand(-1);
    };


    // ---------------------------------------------------------
    // MOG_TitleCommands 좌우 선택 처리
    // ---------------------------------------------------------

    if (typeof Scene_Title !== "undefined") {

        Scene_Title.prototype.addTitleComIndex = function(value) {
            const maxIndex = this._commandWindow._list.length - 1;

            if (maxIndex < 0) {
                return;
            }

            let index = this._commandWindow._index;

            for (let i = 0; i <= maxIndex; i++) {

                index += value;

                if (index < 0) {
                    index = maxIndex;
                }

                if (index > maxIndex) {
                    index = 0;
                }

                if (this._commandWindow.isCommandEnabled(index)) {
                    SoundManager.playCursor();
                    this._commandWindow.select(index);
                    this._picComIndex = index;
                    return;
                }
            }
        };
    }


    // ---------------------------------------------------------
    // MOG_TitleCommands 마우스 판정
    // 비활성화된 이미지는 마우스로 선택 불가
    // ---------------------------------------------------------

    if (typeof TpictureCom !== "undefined") {

        const _TpictureCom_isOnPicCom =
            TpictureCom.prototype.isOnPicCom;

        TpictureCom.prototype.isOnPicCom = function() {

            if (!this._enabled) {
                return false;
            }

            return _TpictureCom_isOnPicCom.call(this);
        };
    }

})();