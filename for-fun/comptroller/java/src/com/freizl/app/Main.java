package com.freizl.app;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.freizl.csv.Reader;
import com.freizl.fp.FP;

public class Main {

	private static final HashMap<Long, Restaurant> INIT_STORE = new HashMap<Long, Restaurant>();
	private static final ParseRecord FN_ROW_PROCESSOR = new ParseRecord();
	private static final ReportMin FN_REPORT_MIN = new ReportMin();
	private static final IsNotZero FN_NON_ZERO = new IsNotZero();

	public static void main(String[] args) {
		System.out.println(run(args));
	}

	public static Report run(String[] args) {
		if (null == args || args.length <= 1) {
			System.err.println("Insuffient input parameters.");
			return null;
		}

		// read parameters
		List<String> argsList = Arrays.asList(args);
		String fileName = argsList.get(0);
		List<String> inputs = argsList.subList(1, argsList.size());

		// read csv
		List<List<String>> dataRaw = Reader.read(fileName);

		// pre-processing
		Map<Long, Restaurant> processed = FP.foldl(FN_ROW_PROCESSOR, dataRaw, INIT_STORE); 
		List<Restaurant> datas = getProcessedData(processed);

		// searching prices upon all restaurants.
		SumPrice fnSumPrice = new SumPrice(inputs);
		List<Report> prices = FP.filter(FN_NON_ZERO, FP.map(fnSumPrice, datas));

		// find the right one.
		if (null != prices && prices.size() >= 1) {
			Report min = FP.foldl(FN_REPORT_MIN, prices, null);
			return min;
		} else {
			System.out.println("Nothing Found.");
			return null;
		}
	}

	/**
	 * Representation for result.
	 */
	public static class Report {
		private Long id;
		private Float price;

		public Report(Long id, Float price) {
			this.id = id;
			this.price = price;
		}

		@Override
		public String toString() {
			return "Report [id=" + id + ", price=" + price + "]";
		}

		public Long getId() {
			return id;
		}

		public Float getPrice() {
			return price;
		}
	}

	static class Restaurant {
		private Long id;
		private Map<String, Float> items = new HashMap<String, Float>();

		public Restaurant(Long id, Map<String, Float> items) {
			this.id = id;
			if (null != items) {
				this.items = items;
			}
		}

		public Long getId() {
			return id;
		}

		public Float getItemPrice(String name) {
			Float x = this.items.get(name);
			return null == x ? 0 : x;
		}

		public void addItems(Map<String, Float> items) {
			if (null != items) {
				this.items.putAll(items);
			}
		}

		@Override
		public String toString() {
			return "Restaurant [id=" + id + ", items=" + items + "]";
		}

	}

	/**
	 * Parse one record to a <code>Restaurant</code> instance.
	 * 
	 */
	static class ParseRecord implements FP.FoldlFunc<List<String>, Map<Long, Restaurant>> {

		/**
		 * Process a singel record and store result to <code>datas</code>.
		 */
		@Override
		public Map<Long, Restaurant> apply(Map<Long, Restaurant> datas, List<String> a) {
			
			if (null != a && a.size() >= 3) {
				Map<String, Float> items = new HashMap<String, Float>();
				Long id = Long.valueOf(a.get(0));
				Float price = Float.valueOf(a.get(1));
				List<String> xs = a.subList(2, a.size());
				for (String x : xs) {
					items.put(x, price);
				}

				Restaurant exists = datas.get(id);
				if (null != exists) {
					exists.addItems(items);
				} else {
					datas.put(id, new Restaurant(id, items));
				}

			} else {
				System.err.println("Invalid record:" + a.toString());
			}

			return datas;
		}

	}

	/**
	 * Sum price per inputs over a restaurant.
	 * 
	 */
	static class SumPrice implements FP.MapFunc<Restaurant, Report> {

		private List<String> inputs = new ArrayList<String>();

		public SumPrice(List<String> inputs) {
			if (null != inputs) {
				this.inputs = inputs;
			}
		}

		@Override
		public Report apply(final Restaurant t1) {
			Float sum = FP.foldl(new FP.FoldlFunc<String, Float>() {
				@Override
				public Float apply(Float init, String a) {
					return init + t1.getItemPrice(a);
				}
			}, inputs, Float.valueOf(0));

			return new Report(t1.getId(), sum);
		}

	}

	/**
	 * Min of two Result of <code>Report</code> base on price sum.
	 * 
	 */
	static class ReportMin implements FP.FoldlFunc<Report, Report> {
		@Override
		public Report apply(Report init, Report a) {
			if (null == init) {
				return a;
			}
			if (null == a) {
				return init;
			}
			return init.price < a.price ? init : a;
		}
	}

	/**
	 * Ignore report which price is zero.
	 */
	static class IsNotZero implements FP.FilterFunc<Report> {
		@Override
		public boolean apply(Report a) {
			return !Float.valueOf(0).equals(a.price);
		}
	}
	
	private static List<Restaurant> getProcessedData (Map<Long, Restaurant> xs) {
		List<Restaurant> ys = new ArrayList<Restaurant>();
		ys.addAll(xs.values());
		return ys;
	}
}
