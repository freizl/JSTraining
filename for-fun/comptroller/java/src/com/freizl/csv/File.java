package com.freizl.csv;

import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

/**
 * Read a file.
 * 
 */
public class File {
	public static List<String> read(String name) {
		List<String> re = new ArrayList<String>();
		try {
			FileInputStream fstream = new FileInputStream(name);
			DataInputStream in = new DataInputStream(fstream);
			BufferedReader br = new BufferedReader(new InputStreamReader(in));
			String strLine;
			while ((strLine = br.readLine()) != null) {
				re.add(strLine);
			}
			in.close();
		} catch (Exception e) {
			// Catch exception if any
			System.err.println("Error: " + e.getMessage());
		}

		return re;
	}

}
