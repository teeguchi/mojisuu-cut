/**
 * mojisuuCut v1.0
 *
 * Copyright 2018, TeeGuchi
 *
 * Released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 */
function mojisuuCut(c, n, s, t) {
	var className = c; // クラスを付ける
	var mcNumber = n; // カットする文字数を入力
	/* 省略記号 部分の表示を入力 */
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
			var e_str = escape(str);
			var zen = Number((e_str.match(/%u/g) || []).length);
			var strAll = Number(str.length);
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
					cutMoji = strSlice + strMore;
				}
			}
			mcArray[i].innerHTML = cutMoji; // 制限した文字列を挿入する
			if ( mcTitle === true) {
				mcArray[i].setAttribute('title', mcSource); // title属性を設定する
			}
		} else {
			cutMoji = mcSource;
			mcArray[i].innerHTML = cutMoji; // 制限した文字列を挿入する
		}
	}
}
