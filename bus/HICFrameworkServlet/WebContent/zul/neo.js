function neo_calc() {
	var gender, percentile, resultString, sds, male, weightlength, gestationalDays, neo_weeks, neo_days;
	var preferVoigt = true;// $('#neo_radio_voigt').is(':checked');
	var preferFenton = false;// $('#neo_radio_fenton').is(':checked');
	var length = $('#neo_length').val().replace(/,/, ".") * 1;
	var weight = $('#neo_weight').val().replace(/,/, ".") * 1;
	var head = $('#neo_head').val().replace(/,/, ".") * 1;
	var neo_weeks = $('#neo_weeks').val() * 1;
	var neo_days = $('#neo_days').val() * 1;
	// if (document.neo_form.neo_radio_female.checked)
	if(document.getElementById("girl").checked)
	male = false;
	 else
	male = true;
	// Erase old results
	/*
	 * $("* .zs-arrow-left").css("visibility", "hidden"); $("*
	 * .zs-arrow-right").css("visibility", "hidden"); $("*
	 * .zs-result-marker").css("visibility", "hidden");
	 * $("div[id$='lln']").html(""); $("div[id$='uln']").html("");
	 * $("div[id$='mean']").html("");
	 */
	// Checking whether Weeks AND Days of gestation have been chosen (else the
	// placeholder 'Weeks' or 'Days" are still active
	if (isNaN(neo_weeks) || isNaN(neo_days))
		return;
	var gestationalDays = (neo_weeks * 7) + neo_days;
	if (length > 0)
		weightlength = weight / length;
	else
		weightlength = 0;
	$("#neo_weightlength").val(bmiRound(weightlength, 10));
	if (preferFenton) {
		$('#neo_weight_lln').html(
				bmiRound(getWeightValueFenton(gestationalDays, male, -2, true),
						1));
		$('#neo_weight_mean').html(
				bmiRound(getWeightValueFenton(gestationalDays, male, 0, true),
						1));
		$('#neo_weight_uln').html(
				bmiRound(getWeightValueFenton(gestationalDays, male, 2, true),
						1));
		$('#neo_length_lln').html(
				bmiRound(getLengthValueFenton(gestationalDays, male, -2, true),
						10));
		$('#neo_length_mean').html(
				bmiRound(getLengthValueFenton(gestationalDays, male, 0, true),
						10));
		$('#neo_length_uln').html(
				bmiRound(getLengthValueFenton(gestationalDays, male, 2, true),
						10));
		$('#neo_head_lln').html(
				bmiRound(getHeadValueFenton(gestationalDays, male, -2, true),
						10));
		$('#neo_head_mean')
				.html(
						bmiRound(getHeadValueFenton(gestationalDays, male, 0,
								true), 10));
		$('#neo_head_uln')
				.html(
						bmiRound(getHeadValueFenton(gestationalDays, male, 2,
								true), 10));
	} else {
		$('#neo_weight_lln').html(
				bmiRound(getWeightValueVoigt(gestationalDays, male, -2, true),
						1));
		$('#neo_weight_mean')
				.html(
						bmiRound(getWeightValueVoigt(gestationalDays, male, 0,
								true), 1));
		$('#neo_weight_uln')
				.html(
						bmiRound(getWeightValueVoigt(gestationalDays, male, 2,
								true), 1));
		$('#neo_length_lln').html(
				bmiRound(getLengthValueVoigt(gestationalDays, male, -2, true),
						10));
		$('#neo_length_mean').html(
				bmiRound(getLengthValueVoigt(gestationalDays, male, 0, true),
						10));
		$('#neo_length_uln').html(
				bmiRound(getLengthValueVoigt(gestationalDays, male, 2, true),
						10));
		$('#neo_head_lln')
				.html(
						bmiRound(getHeadValueVoigt(gestationalDays, male, -2,
								true), 10));
		$('#neo_head_mean')
				.html(
						bmiRound(getHeadValueVoigt(gestationalDays, male, 0,
								true), 10));
		$('#neo_head_uln')
				.html(
						bmiRound(getHeadValueVoigt(gestationalDays, male, 2,
								true), 10));
	}
	$('#neo_weightlength_lln').html(
			bmiRound(
					getWeightlengthValueVoigt(gestationalDays, male, -2, true),
					10));
	$('#neo_weightlength_mean').html(
			bmiRound(getWeightlengthValueVoigt(gestationalDays, male, 0, true),
					10));
	$('#neo_weightlength_uln').html(
			bmiRound(getWeightlengthValueVoigt(gestationalDays, male, 2, true),
					10));
	// Weight percentiles
	if ((gestationalDays > 0) && (weight > 0)) {
		if (preferVoigt)
			sds = getWeightValueVoigt(gestationalDays, male, weight, false);
		else
			sds = getWeightValueFenton(gestationalDays, male, weight, false);
		if (sds != -100) {
			// setZMarker("weight", sds, 100);
			percentile = (get_auc_from_z(sds));
			$("#neo_percentile_weight").html(
					bmiRound(percentile * 100, 1) + " Percentile");
			//$("#neo_sds_weight").html(bmiRound(sds, 100) + " z");
		}
	}
	// length percentiles
	if ((gestationalDays > 0) && (length > 0)) {
		if (preferVoigt)
			sds = getLengthValueVoigt(gestationalDays, male, length, false);
		else
			sds = getLengthValueFenton(gestationalDays, male, length, false);
		if (sds != -100) {
			setZMarker("length", sds, 100);
			percentile = (get_auc_from_z(sds));
			$("#neo_percentile_length").html(
					bmiRound(percentile * 100, 1) + " P.");
			$("#neo_sds_length").html(bmiRound(sds, 100) + " z");
		}
	}
	// head percentiles
	if ((gestationalDays > 0) && (head > 0)) {
		if (preferVoigt)
			sds = getHeadValueVoigt(gestationalDays, male, head, false);
		else
			sds = getHeadValueFenton(gestationalDays, male, head, false);
		if (sds != -100) {
			setZMarker("head", sds, 100);
			percentile = (get_auc_from_z(sds));
			$("#neo_percentile_head").html(
					bmiRound(percentile * 100, 1) + " P.");
			$("#neo_sds_head").html(bmiRound(sds, 100) + " z");
		}
	}
	// Weightlength percentiles
	if ((gestationalDays > 0) && (weightlength > 0)) {
		sds = getWeightlengthValueVoigt(gestationalDays, male, weightlength,
				false);
		if (sds != -100) {
			setZMarker("weightlength", sds, 100);
			percentile = (get_auc_from_z(sds));
			$("#neo_percentile_weightlength").html(
					bmiRound(percentile * 100, 1) + " P.");
			$("#neo_sds_weightlength").html(bmiRound(sds, 100) + " z");
		}
	}
}
// Weight according to Voigt
function getWeightValueVoigt(gestationalDays, male, value, valueIsZ) {
	var result;
	var grid = new Array(140, 147, 154, 161, 168, 175, 182, 189, 196, 203, 210,
			217, 224, 231, 238, 245, 252, 259, 266, 273, 280, 287, 294, 301);
	var stabw_male = new Array(90, 96, 106, 115, 124, 157, 189, 229, 267, 308,
			327, 355, 381, 410, 426, 437, 446, 444, 436, 433, 441, 450, 465,
			524);
	var mean_male = new Array(499, 540, 579, 634, 710, 800, 884, 1008, 1129,
			1277, 1449, 1650, 1860, 2088, 2344, 2615, 2863, 3101, 3310, 3485,
			3624, 3737, 3799, 3697);
	var stabw_female = new Array(88, 98, 107, 117, 126, 151, 176, 220, 262,
			302, 322, 356, 382, 412, 422, 444, 443, 436, 423, 418, 422, 429,
			448, 508);
	var mean_female = new Array(479, 515, 549, 599, 665, 747, 823, 936, 1050,
			1192, 1368, 1558, 1773, 1987, 2249, 2510, 2750, 2976, 3175, 3342,
			3473, 3578, 3634, 3526);
	if (male) {
		result = getMeanStabwValuesInterpolated(value, gestationalDays, grid,
				mean_male, stabw_male, valueIsZ);
	} else {
		result = getMeanStabwValuesInterpolated(value, gestationalDays, grid,
				mean_female, stabw_female, valueIsZ);
	}
	return result;
}
// Length according to Voigt
function getLengthValueVoigt(gestationalDays, male, value, valueIsZ) {
	var result;
	var grid = new Array(140, 147, 154, 161, 168, 175, 182, 189, 196, 203, 210,
			217, 224, 231, 238, 245, 252, 259, 266, 273, 280, 287, 294, 301);
	var stabw_male = new Array(2.4, 2.4, 2.6, 2.7, 2.7, 3, 3.2, 3.5, 3.7, 3.6,
			3.4, 3.3, 3.1, 3, 2.9, 2.7, 2.6, 2.4, 2.3, 2.3, 2.3, 2.3, 2.4, 2.6);
	var mean_male = new Array(26.8, 28.2, 29.5, 30.7, 31.8, 33.3, 34.6, 35.9,
			37.3, 38.8, 40.3, 41.8, 43.2, 44.7, 46.2, 47.8, 49.1, 50.2, 51.1,
			51.9, 52.5, 53.1, 53.4, 52.9);
	var mean_female = new Array(26.6, 27.8, 29.1, 30.3, 31.4, 32.7, 34, 35.3,
			36.7, 38, 39.7, 41.1, 42.6, 44, 45.6, 47.2, 48.4, 49.5, 50.4, 51.1,
			51.7, 52.2, 52.5, 52);
	var stabw_female = new Array(2.5, 2.5, 2.6, 2.7, 2.7, 2.9, 3.2, 3.4, 3.6,
			3.5, 3.4, 3.5, 3.3, 3.1, 2.9, 2.8, 2.6, 2.4, 2.3, 2.2, 2.2, 2.2,
			2.3, 2.6);
	if (male) {
		result = getMeanStabwValuesInterpolated(value, gestationalDays, grid,
				mean_male, stabw_male, valueIsZ);
	} else {
		result = getMeanStabwValuesInterpolated(value, gestationalDays, grid,
				mean_female, stabw_female, valueIsZ);
	}
	return result;
}
// Head circumference according to Voigt
function getHeadValueVoigt(gestationalDays, male, value, valueIsZ) {
	var result;
	var grid = new Array(140, 147, 154, 161, 168, 175, 182, 189, 196, 203, 210,
			217, 224, 231, 238, 245, 252, 259, 266, 273, 280, 287, 294, 301);
	var stabw_male = new Array(1.8, 1.8, 1.6, 1.7, 1.8, 1.7, 1.8, 1.8, 1.9,
			2.1, 2, 1.9, 1.9, 1.8, 1.7, 1.6, 1.6, 1.5, 1.4, 1.3, 1.3, 1.3, 1.4,
			1.5);
	var mean_male = new Array(20.2, 20.9, 21.7, 22.3, 23.1, 23.9, 24.7, 25.7,
			26.7, 27.6, 28.5, 29.5, 30.4, 31.3, 32.2, 33.1, 33.8, 34.4, 34.9,
			35.3, 35.6, 35.9, 36.1, 35.8);
	var stabw_female = new Array(1.8, 1.8, 1.7, 1.7, 1.8, 1.8, 1.8, 1.9, 2,
			2.1, 2, 2, 1.9, 1.9, 1.7, 1.6, 1.5, 1.4, 1.3, 1.3, 1.3, 1.3, 1.3,
			1.4);
	var mean_female = new Array(20.2, 20.9, 21.5, 22.1, 22.8, 23.6, 24.3, 25.3,
			26.2, 27, 28, 28.9, 29.8, 30.7, 31.7, 32.6, 33.3, 33.9, 34.3, 34.6,
			34.9, 35.2, 35.4, 35.2);
	if (male) {
		result = getMeanStabwValuesInterpolated(value, gestationalDays, grid,
				mean_male, stabw_male, valueIsZ);
	} else {
		result = getMeanStabwValuesInterpolated(value, gestationalDays, grid,
				mean_female, stabw_female, valueIsZ);
	}
	return result;
}
// Weightlength according to Voigt
function getWeightlengthValueVoigt(gestationalDays, male, value, valueIsZ) {
	var result;
	var grid = new Array(140, 147, 154, 161, 168, 175, 182, 189, 196, 203, 210,
			217, 224, 231, 238, 245, 252, 259, 266, 273, 280, 287, 294, 301);
	var stabw_male = new Array(2.5, 2.5, 2.7, 2.7, 3, 3.4, 4, 4.6, 5.4, 6, 6.6,
			6.8, 6.9, 7.2, 7.2, 7.1, 7.1, 7, 6.8, 6.7, 6.7, 6.8, 6.9, 7.8);
	var mean_male = new Array(20.1, 20.9, 21.8, 22.8, 23.8, 24.9, 26.6, 28.8,
			30.8, 33.2, 36.3, 39.5, 43, 46.7, 50.6, 54.6, 58.2, 61.6, 64.6, 67,
			68.9, 70.3, 71, 69.8);
	var stabw_female = new Array(2.5, 2.5, 2.6, 2.7, 3, 3.3, 3.9, 4.5, 5.2, 6,
			6.3, 6.8, 7.1, 7.4, 7.2, 7.3, 7.1, 6.9, 6.7, 6.5, 6.6, 6.6, 6.8,
			7.8);
	var mean_female = new Array(20.1, 20.7, 21.6, 22.4, 23.3, 24.3, 25.9, 27.7,
			29.7, 31.8, 34.7, 38.1, 41.6, 45, 49.3, 53.1, 56.7, 60, 62.9, 65.3,
			67, 68.4, 69.1, 67.7);
	if (male) {
		result = getMeanStabwValuesInterpolated(value, gestationalDays, grid,
				mean_male, stabw_male, valueIsZ);
	} else {
		result = getMeanStabwValuesInterpolated(value, gestationalDays, grid,
				mean_female, stabw_female, valueIsZ);
	}
	return result;
}
// Neonatal growth percentiles according to Fenton et al.
// The author of this app optained a licence for using the data
// Please do not copy the data.
// For a licence please contact tanisfenton@shaw.ca
function getWeightValueFenton(gestationalDays, male, value, valueIsZ) {
	var result;
	var grid = "161,Ä€8Äƒ75Äƒ82Ä‰9Äƒ96,203Ä‘10Ä•7Ä‘24Ä‘3Ä‚23Ä…Ä›Äˆ25Ä‹Ä¥Ä26Ä27Ä”28Ä—Ä°Ä™29Äœ30Ä‚Ä¸Ä…ÄžÄˆ32Ä‹Ä¿Ä33Ä34Ä”350";
	var m_male = "570.5664382,651.0479355,74ÄŽÄ”Ä•Ä’0,8Ä™.18Ä†ÄÄ–952.6016988,1078.Ä˜Ä€Äˆ3Ä³2Ä¾.8942087Ä³ÄˆÄ·303Ä›9Ä³Ä€Ä·021Ä®Ä´Ä³ÄÄ¢Ä 3Ä®4,Å„Ä£Ä19Å¤5ÅžÄ¾Å¦ÄƒÄ™Ä’76ÅŸ49ÄªÅ­ÅÅ°Å§725Ä«Ä°2Ä¯Ä²2Å‚6Ä«Ä¬Ä†Ä¯,ÅœÄ•Å€75Å‹1Ä¼ÅÄ¬.Ä‘7Ä¶81Æ†Ä„7.9Ä12Æ“Æ†Ä¶Å¹34Ä±Å¨,4Ä­4Æ‘ÄÅÄ’Æ§Å¸ÄŽÅ¿6Ä£Ä¬Æ§Å°ÄŽÅ·Æ³0Æ›Æ§7ÅœÄƒÄ Æ“Ä£Æ§9Ä…Ä¸Å±2Å‹Ä¼ÄÄ¨Ä¢1ÆŠÆ•Æ–Å¦Ä®ÇŽÆ•Ä©Ç’6Å¿Ä«Ä´Å…Å¤,58Ä”Ä0Ç¤Ç¥";
	var l_male = "0.7486577,Ä€9132046,1.061499ÄˆÄ“18Ä™Ä1Ä’.293781Ä¡Ä“36Ä„922Ä¢41017Ä¥Ä²ÄŒÄ·0Ä›.Ä¦5Ä³Ä¶Ä¢Ä¤88Ä¼0Ä¢195Ä–Ä¯Ä¢Ä¼Ä§3ÄÄ‰.Å‹Ä‚3Ä³Å”8Ä1Ä°9Å”Ä‚9Ä•5ÅŸÄ€66Äƒ9Ä˜Å”Å¤ÅŠÄ†5Å¬2Ä„Äµ4Å”473ÅŠ6ÄˆÄ€42ÄÄ¤ÅµÄ€3823Å´Å”Å˜ÅŒÄ¬Å¥Ä¾Ä—Ä•03Å”Å²6Ä™Æ‘Æ“6Ä¦1Ä–Æ“4Å˜00Å°Ä€Ä°5ÅŠÄŒÆ“0Æ…Å¯";
	var s_male = "0.1456257,Ä€1Ä…3049Ä‰Ä772Ä”3Ä‘190Ä‚Ä…Ä‘20ÄŽ33ÄˆÄ€ÄŸ76718Äž11399Ä«Ä¥Ä­Ä¯66Äž0Ä§9Ä©Ä¸Ä¹91Ä¤ÄÄ¿6152Ä˜8Ä­2Ä™Ä˜70265Ä²Ä5Ä°84Ä·ÄŠ5083Ä®Ä˜42Ä»44Ä˜3Å‘Å¨Å¦Å€Ä„ÄÄŠ28685Ä—Å®Ä©Å›1Ä˜ÅÅ„2Å´ÄÅ5ÄªÅ1ÅÅž55Å¹54Ä©Å½ÆƒÄ¯4Å—Å¹2Å‹ÅŒÅ®Ä¹Æ’Å‡Æ•Ä Ä ";
	var m_female = "537.1507938,606.2Ä8800Ä‹94Äƒ29Äˆ74,Ä‡1.84Ä‡483,898.Ä…86Ä¯ÄŠ101Ä‚Äš7Ä³Ä´,1Ä„Ä¡Ä£Ä”875Ä»305.7034Ä¼Ä•1Ä¦2ÄÄ—ÅŠ39Ä»Ä°0.Ä«27Å•2Ä»ÄªÄ‚Ä¼Ä„526,212Å‡Ä£Å3Å…Å¨36Å‘3Ä€8Ä…ÅŸÅ¦Ä´Ä­ÄˆÄ´4Å–2Ä§Å‡0Ä£55Ä¼,Å…Å¿.6Ä°Å«Ä›Æ‰Ä9.Å…ÄŒÄ¼Å§Å‹Ä„ÄÄ°Æ†1Å–Åµ9Å‡Æ4ÆÆˆÄ‘Ä‚Ä‰4Å•Å¥Æ‰Ä«Æ¨ÆÅ•ÆˆÅŒ9Å‘0Åœ7Ä’Ä¨Æª9Ä‚Ä“6Ä«1ÆºÆ–ÄƒÄˆ3Ä¼Å–Ä¦Ä”.Å†Ä‡Ç†ÅƒÅ¿ÄˆÅ¼Å2Å©,Æ‡8Ä¡Ç”Æ‚Ä³Ç–Å²ÆµÄ”Ç 0";
	var l_female = "0.2175070,Ä€5294487Ä‰.82Ä„024,1.0Ä…976Ä™Ä›1915451ÄšÄ5Ä¥772Ä«2Ä¡563Ä‘Ä›Ä‚839ÄµÄ«13Å€Ä¶Ä¸Äœ14Ä¦9ÄˆÄ€Ä74Ä°Ä™Ä€7Å9Ä9Ä’588Å‡ÅÄ’Ä¨Å308Ä’34ÄÄ³ÅÄ67Å‰36Ä’20Ä6ÄŸÄ’Äƒ04325ÅµÅŽÅ±9Å¢Ä€Å€5Ä¯Ä½ÅµÅ¹Ä¯ÄÆ†ÄŽÄ†Å»ÆÅ­96Ä‹Æ†ÅªÅ‰Å®ÆŽ0Ä†6ÅŠ.1Æ‚Æš3Ä’Å¡3Ä§6ÄªÄ€Ä†Å«Æ˜0";
	var s_female = "0.1464508,Ä€1613Ä†ÄˆÄŠ805974Ä‰Ä986Ä–Ä.2Ä31Ä†Ä˜2239Ä¦7Ä¥300789Ä¬Ä4Ä¯Ä¥27Ä¢55Ä¥1Ä›Ä£0Ä¥0685Ä°Ä˜1937Åƒ1ÅˆÄ’8Ä¦ÅŽÄŠ6Äš24Å“ÄÄŒÄ¢76Åˆ54Ä±Ä»ÅŸ01ÅƒÄ²ÄŠÄƒÄ†Ä¶Å©363Ä¢ÅˆÅ˜Ä¦Ä•ÅˆÄ¨Ä¾5Å™ÄÄ–Å¥3Å¶Å†Ä’2Å¶4Ä¦5ÄžÄ2Å„8Å¾ÄŠÄ¢Ä‹Æ„Åˆ296Å¹Ä«ÄŠ28Ä‚Æ“";
	if (male) {
		result = getLMSValuesInterpolated(value, gestationalDays, fenton(grid),
				fenton(l_male), fenton(m_male), fenton(s_male), valueIsZ);
	} else {
		result = getLMSValuesInterpolated(value, gestationalDays, fenton(grid),
				fenton(l_female), fenton(m_female), fenton(s_female), valueIsZ);
	}
	return result;
}
// Neonatal growth percentiles according to Fenton et al.
// The author of this app optained a licence for using the data
// Please do not copy the data.
// For a licence please contact tanisfenton@shaw.ca
function getLengthValueFenton(gestationalDays, male, value, valueIsZ) {
	var result;
	var grid = "168,175Äƒ82Ä‡9Äƒ96,203Ä10Ä“7Ä24Ä31Ä›Ä‚Ä™Ä†25Ä‰Ä¢Ä‹26ÄŽ27Ä’28Ä•Ä­Ä—29Äš30ÄÄµÄ‚ÄœÄ†32Ä‰Ä¼Ä‹33ÄŽ34Ä’350";
	var m_male = "30.9238377,32.317Ä€16ÄŠ3.70Ä˜45Ä‰35.074Ä¢84ÄŠ6.Ä¢594Ä ÄŠ7.8203412ÄŠ9.Ä²Ä´099,Ä¬.6Ä˜2Ä¾1Å€ÄŒÄ˜1Ä±28Å€Ä•Ä…Ä¢615Å€4Ä–2Ä¬72Ä“ÄšÄ‚9651Ä‹Å€Ä¯Ä85ÄÄ·48Äº6Ä¡6Å±Å€Ä¹ÅÄ¶1Å”,5ÄÄ„Å¨68ÅŽÅ¢.Å”Ä†Ä‡Å‡5Å‰5Å¿Åº0Å¹ÄŒÄ«ÄˆÄ¬Æ€Ä•Ä±1Ä«Ä„Å¹Å—Å¯7ÄƒÆ—5ÄžÅ¢21Å¬Ä“5Ä§Ä‹Ä¶Ä¡3Å¹Å¦06Å™Æ•Æ«Ä°Å›ÅœÅ¤Æ‰Å‚Å™Æ›4Ä‰ÄªÄ69Å”Æ¿";
	var l_male = "1.0Ä‚Äƒ0,Ä€Ä„ÄƒÄ†ÄÄˆÄ…Ä‡ÄŒÄŠÄŒÄÄ‹ÄˆÄÄÄŽÄ”Ä—Ä„Ä•Ä˜Ä“ÄšÄ™Ä‰ÄŸÄ‚Ä›ÄžÄÄ Ä¥Ä¢Ä¡Ä’Ä‘Ä£Ä¦Ä«Ä©Ä¬Ä¨Ä§ÄªÄ–Ä²Ä°Ä³Äˆ";
	var s_male = "0.0638442,Ä€Ä‚54641Ä‰Ä6Äƒ497Ä‘Ä‚65224Ä˜Ä“07ÄƒÄŸ512ÄšÄŸ378ÄªÄŸ21586ÄŸ03298Ä˜Ä±3Ä†Ä—ÄŠ56Ä93Äº4089Ä³Ä¿1911ÄžÄŠÄ•7579Ä˜4Ä¢6Ä–Å—Å€87ÄˆÅ‘Ä„5Å‡Å—Ä¯9Å›Å‘Ä¡Ä5Ä˜39Å˜ÄŽÅ­Ä¬7Å®Å­7Ä‡3Å„ÄŠ3Ä Ä²Å­590ÅÅ¿Ä·9Å¬Å»Å˜5ÅµÆˆÄ71";
	var m_female = "30.2617915,31.6050Ä‘9ÄŠ2.95Ä72Ä‰34.Ä‹Ä€5Ä€ÄŠ5Ä8ÄÄ3ÄŠ7.Ä88Ä¢6ÄŠ8.44Ä—59Ä²39.Ä°3570Äª4ÄŒÄƒ02378,4Ä•647Ä‹Ä¢Å3Ä–92Ä1Ä“4Ä¥2716Äº7Å6ÄµÅÅ‰Å˜ÅÄ¬5ÅÅ¢94ÅÄ´5Ä°1ÅŸÅŒÄ·.Ä¢8Å“ÄªÄÄµÅŠÄ2ÅŒ5Å†9Ä¼382,5Ä•1Ä…1Ä€Æ‹ÆÄ–1Åƒ4Ä§ÆŒÅ–67Å 181ÆŒÄžÅŽ0Å£0ÆŒÄ¥1ÅÆ¤Å¾Ä¥Ä°4Ä‘6Æ„Å¦Ä˜ÅˆÄ¶Ä²ÅÄ‚ÅŠÅ¢ÅƒÆŒÄ¬Ä‡9Æ 29";
	var l_female = "1.0Ä‚Äƒ0,Ä€Ä„ÄƒÄ†ÄÄˆÄ…Ä‡ÄŒÄŠÄŒÄÄ‹ÄˆÄÄÄŽÄ”Ä—Ä„Ä•Ä˜Ä“ÄšÄ™Ä‰ÄŸÄ‚Ä›ÄžÄÄ Ä¥Ä¢Ä¡Ä’Ä‘Ä£Ä¦Ä«Ä©Ä¬Ä¨Ä§ÄªÄ–Ä²Ä°Ä³Äˆ";
	var s_female = "0.0618109,Ä€Ä‚34213Ä‰Ä647578Ä‘Ä‚Ä–Ä—Ä˜ÄŠ6Ä“ÄŽÄÄ’ÄŸ301Ä™Ä¤454Ä¨5512Ä¢Ä‚41492Ä¨2ÄŒ3Ä²6Ä¦88Ä¸ÄŠÄ›74Ä²Ä®195Å‚ÄÅ‹Ä«Ä„Ä™Ä¶9Ä‚ÅŒ0Ä”Ä¼07Å‘50Ä–ÄÄŠ4Ä¥2Ä¯Å‘ÄÄÄ¬ÄŠ398Å“6Ä™Ä¼722ÄˆÅ©7Å¶ÄƒÅ¯7Ä¦Ä“Å¯Ä“Ä‡Å®Å©5Ä·Å‰Å¯ÅˆÅ“Æ…16Å…";
	if (male) {
		result = getLMSValuesInterpolated(value, gestationalDays, fenton(grid),
				fenton(l_male), fenton(m_male), fenton(s_male), valueIsZ);
	} else {
		result = getLMSValuesInterpolated(value, gestationalDays, fenton(grid),
				fenton(l_female), fenton(m_female), fenton(s_female), valueIsZ);
	}
	return result;
}
// Neonatal growth percentiles according to Fenton et al.
// The author of this app optained a licence for using the data
// Please do not copy the data.
// For a licence please contact tanisfenton@shaw.ca
function getHeadValueFenton(gestationalDays, male, value, valueIsZ) {
	var result;
	var grid = "168,175Äƒ82Ä‡9Äƒ96,203Ä10Ä“7Ä24Ä31Ä›Ä‚Ä™Ä†25Ä‰Ä¢Ä‹26ÄŽ27Ä’28Ä•Ä­Ä—29Äš30ÄÄµÄ‚ÄœÄ†32Ä‰Ä¼Ä‹33ÄŽ34Ä’350";
	var m_male = "21.74Äƒ425,22Ä‚26481Äˆ23Ä‚006711Ä‰4.6692Ä™Ä’5Äž3Äš783Ä‰6.5853849Ä‰7Ä®30Ä°Ä°Ä‰8.4ÄŸ344Ä«29.Ä²Ä±19Ä«Ä¹.Ä¢599Å„,Ä§.1Ä35ÄšÅ•ÄÄ¡Å„Ä™6Å•Ä‹6Ä¯Ä´ÄŸÅ•Ä”3Ä¢7ÄÄ›3Ä”Å“16Å‹ÅÄÅ›0Å‹Å”Åš.0Å„Å€ÅŒÅ•Ä¥5Å›Å†60Å•Ä­039Ä Å­Æ‰Ä®1ÄºÄŸÄˆ3Ä­Æ6ÄªÅ˜Å•Ä·40Æ188Æœ.Ä³Å˜5Å´Å•Ä¾Å™7Å¡ÆªÄž79Æ¡ÄÅ•Å‡Äº9Æ„Ä–ÆµÄ¿ÆÄ°17";
	var l_male = "1.0Ä‚Äƒ0,Ä€Ä„ÄƒÄ†ÄÄˆÄ…Ä‡ÄŒÄŠÄŒÄÄ‹ÄˆÄÄÄŽÄ”Ä—Ä„Ä•Ä˜Ä“ÄšÄ™Ä‰ÄŸÄ‚Ä›ÄžÄÄ Ä¥Ä¢Ä¡Ä’Ä‘Ä£Ä¦Ä«Ä©Ä¬Ä¨Ä§ÄªÄ–Ä²Ä°Ä³Äˆ";
	var s_male = "0.0575676,Ä€Ä‚68309Ä‰ÄÄ…0603Ä‘Ä‚525Ä‚Ä˜543937Äž34Ä1ÄžÄ›1Ä¬Äž1471Ä—ÄŠÄœ36ÄƒÄ˜492Ä”Ä³ÄÄ§00Ä°Ä¹Ä†73Ä¾Å‚5ÄšÄ£Ä¹42ÄŒÅˆÄ 0188Ä¹17872Ä¹Ä‚85Å–ÄŠÄ¡ÅŽ5ÄÅ¢Ä¨Ä²Ä˜Ä£2Ä£5Åª6199Ä¤Å¢5Å±3Ä©Å¢ÅŽ12Å¦ÄÅ‡Ä›Ä ÅªÅ¬Å¼Å®Å¢Ä²82Å´Å¿Å‚Ä•1";
	var m_female = "21.3411622,Äˆ.2695706ÄŠ3.19Ä˜059ÄŠ4Ä–324Ä‡0ÄŠ5.Ä’76778ÄŠ6Ä§ÄšÄ33Ä®.94Ä©987ÄŠ7.892Äº4Ä‰28Ä¿ÄƒÄ…ÄªÄŠ9.75563Å,30.6Ä„Å7Ä‰3ÄÄ¸6Äª6Ä¤Ä ÄŒ451035Å•2Ä¶4Ä Ä˜Ä¼Ä³.Ä90Ä©Å³ÄžÄ†Å¸4Å”ÄƒÅ˜9Å¡ÅžÅ³Ä¦Ä—Å¾ÄƒÄœÅ«Å˜6148Ä€Å•Ä¯0Å²08Ä­3Ä¯Å¨Å‚Ä¢ÆŠÄ¯Å·Å§Å†ÅÄ¾2Ä«Ä¬Ä„Å•Ä¾Å’Å£Æ4Æ©Ä¶ÆÅ™5Æ®3Å‡Ä Æ”Å«Ä´ÆµÅ˜Æ³Ä—Ä";
	var l_female = "1.0Ä‚Äƒ0,Ä€Ä„ÄƒÄ†ÄÄˆÄ…Ä‡ÄŒÄŠÄŒÄÄ‹ÄˆÄÄÄŽÄ”Ä—Ä„Ä•Ä˜Ä“ÄšÄ™Ä‰ÄŸÄ‚Ä›ÄžÄÄ Ä¥Ä¢Ä¡Ä’Ä‘Ä£Ä¦Ä«Ä©Ä¬Ä¨Ä§ÄªÄ–Ä²Ä°Ä³Äˆ";
	var s_female = "0.0565503,Ä€Ä‚63141Ä‰ÄÄ…9900Ä‘Ä‚Ä…647Ä˜Ä…018Ä—ÄŠ543Ä8Äž34874Äž24672Äž1278Ä¯ÄŠ4Ä”5ÄÄ˜Ä¬5Ä±Ä»ÄÄœ02ÅƒÅÄ¥8ÅÅ39Ä¬ÄÄ¼Ä±3ÄŒÅ098Ä›Ä˜ÅÄŒ15ÅÄºÄ‡ÄÄŠ37Ä2ÄˆÅ¦ÄŒÄ¦Ä©Å¦ÅŒÅ§ÅÄœ17Å¥ÄÄ«Ä‡Ä·ÅÅ¹ÅšÅ28ÅÄ£Å¸Åª0Ä¦ÅÅµ9ÄŽ";
	if (male) {
		result = getLMSValuesInterpolated(value, gestationalDays, fenton(grid),
				fenton(l_male), fenton(m_male), fenton(s_male), valueIsZ);
	} else {
		result = getLMSValuesInterpolated(value, gestationalDays, fenton(grid),
				fenton(l_female), fenton(m_female), fenton(s_female), valueIsZ);
	}
	return result;
}
function formatNeoInfo(parameter) {
	var preferFenton = $('#neo_radio_fenton').is(':checked');
	var preferVoigt = $('#neo_radio_voigt').is(':checked');
	// Erasing every info div
	$("[id^=info]").each(function(index, element) {
		$(this).css("display", "none");
	});
	switch (parameter) {
	case "weight":
		if (preferFenton)
			$('#infoFenton').css("display", "inline");
		else
			$('#infoVoigt').css("display", "inline");
		break;
	case "length":
		if (preferFenton)
			$('#infoFenton').css("display", "inline");
		else
			$('#infoVoigt').css("display", "inline");
		break;
	case "head":
		if (preferFenton)
			$('#infoFenton').css("display", "inline");
		else
			$('#infoVoigt').css("display", "inline");
		break;
	case "weightlength":
		$('#infoVoigt').css("display", "inline");
		break;
	}
}
