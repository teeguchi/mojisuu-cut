/**
 * mojisuuCut v1.1
 *
 * Copyright 2018, TeeGuchi
 *
 * Released under the MIT License.
 * https://github.com/teeguchi/mojisuu-cut/blob/master/LICENSE
 */
function mojisuuCut(c, n, s, t) {
	var className = c; // クラスを付ける
	var mcNumber = n; // カットする文字数を入力
	/* 省略記号部分の表示を入力 */
	var strMore = '';
	if (s == null) {
		strMore = '...';
	} else {
		strMore = s;
	}
	/* title属性の設定の有効化 */
	var mcTitle = true;
	if (t == null) {
		mcTitle = true;
	} else {
		mcTitle = t;
	}

	var mcArray = document.getElementsByClassName(className);  // 要素取得
	var mcSource = new Array();

	for (var i = 0; i < mcArray.length; i++) {
		mcSource = mcArray[i].innerHTML; // テキストソース取得

		/* 文字数を数える関数 */
		function countMoji(str) {
			var zen = (str.match(/[\u0800-\uD7FF]|[\uD800-\uDBFF][\uDC00-\uDFFF]/g) || []).length;
			var strAll = str.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, '*').length;
			var han = strAll - zen;
			var hanAll = han + zen * 2;  // すべて半角での数
			return hanAll;
		}

		/* 文字数が指定より多かったら実行する */
		var strCompa = countMoji(mcSource);
		if (strCompa > mcNumber) {
			/* 文字を一文字づつスライスして、指定数と比較する */
			for (var j = 0; j <= mcSource.length; j++) {
				var strSlice = mcSource.slice(0,j);
				var numMoji = countMoji(strSlice);
				if (numMoji <= mcNumber) {
					var lastStr = mcSource[j - 1];
					var beyoStr = mcSource[j];
					var cutMoji = strSlice;
				}
			}
			// サロゲートペアと半角カタカナの処理
			if (lastStr != undefined && beyoStr != undefined) {
				if (lastStr.search(/[\uD800-\uDBFF]/) != -1 || beyoStr.search(/[ﾟﾞ]/) != -1) {
					if (mcNumber % 2 != 0) {
						cutMoji = cutMoji.slice(0,cutMoji.length - 1);
					} else {
						cutMoji += beyoStr;
					}
				}
			}
			mcArray[i].innerHTML = cutMoji + strMore; // 制限した文字列を挿入する
			if (mcTitle === true) {
				mcArray[i].setAttribute('title', mcSource); // title属性を設定する
			}
		} else {
			cutMoji = mcSource;
			mcArray[i].innerHTML = cutMoji + strMore; // 文字列を挿入する
		}
	}
}
