package com.freizl.csv;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.freizl.fp.FP;

/**
 * Read a csv file and do parsing.
 * 
 */
public final class Reader {

	private static final SplitByComma FN = new SplitByComma();

	public static List<List<String>> read(String name) {
		List<String> ss = File.read(name);
		return FP.map(FN, ss);
	}

	private static class SplitByComma implements com.freizl.fp.FP.MapFunc<String, List<String>> {
		@Override
		public List<String> apply(String t1) {
			List<String> re = new ArrayList<String>();

			if (t1 != null && !t1.trim().isEmpty()) {
				re = Arrays.asList(t1.trim().split(",[ ]*"));
			}
			return re;
		}

	}

}
