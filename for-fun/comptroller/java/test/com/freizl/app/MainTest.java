package com.freizl.app;

import static org.junit.Assert.*;

import java.util.Arrays;
import java.util.List;

import org.junit.Test;

import com.freizl.app.Main.Report;

public class MainTest {

	@Test
	public void testRun1() {

		List<String> xs = Arrays.asList("./datas/0.csv", "tofu_log");
		Report expect = new Report(2L, 6.5F);
		test(xs, expect);
	}

	@Test
	public void testRun2() {

		List<String> xs = Arrays.asList("./datas/0.csv", "fancy_european_water");
		Report expect = new Report(6L, 5F);
		test(xs, expect);
	}

	@Test
	public void testRun3() {
		List<String> xs = Arrays.asList("./datas/1.csv", "burger", "tofu_log");
		Report expect = new Report(2L, 11.5F);
		test(xs, expect);
	}

	@Test
	public void testRun4() {
		List<String> xs = Arrays.asList("./datas/2.csv", "chef_salad", "wine_spritzer");
		Report expect = new Report(4L, 2.5F);
		test(xs, expect);
	}

	@Test
	public void testRun5() {
		List<String> xs = Arrays.asList("./datas/2.csv", "chef_salad");
		Report expect = new Report(3L, 4F);
		test(xs, expect);
	}

	@Test
	public void testRun6() {
		List<String> xs = Arrays.asList("./datas/3.csv", "fancy_european_water", "extreme_fajita");
		Report expect = new Report(6L, 11F);
		test(xs, expect);
	}

	@Test
	public void testRun7() {
		List<String> xs = Arrays.asList("./datas/3.csv", "tofu_logxxxxx");
		Report run = Main.run((String[]) xs.toArray());
		assertNull(run);
	}

	private void test(List<String> args, Report expect) {
		Report run = Main.run((String[]) args.toArray());
		assertNotNull(run);
		assertEquals(expect.getId(), run.getId());
		assertEquals(expect.getPrice(), run.getPrice());
	}
}
