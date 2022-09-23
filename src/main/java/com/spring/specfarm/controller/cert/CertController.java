package com.spring.specfarm.controller.cert;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.spring.specfarm.common.CommUtils;
import com.spring.specfarm.service.cert.CertService;

@RestController
@RequestMapping("/cert")
public class CertController {

	@Autowired
	private CertService certService;

	@GetMapping("/certList")
	public void certList(String[] args) throws Exception {

		StringBuilder urlBuilder = new StringBuilder(
				"http://openapi.q-net.or.kr/api/service/rest/InquiryListNationalQualifcationSVC/getList"); /* URL */
		urlBuilder.append("?" + URLEncoder.encode("ServiceKey", "UTF-8")
				+ "=ySQ1XKt4a%2BcNW7xeGq2VNZ%2Bjn7X1%2BXoOZBxD6rYtHIULgxkiUXwv0Dg5Rb8Re%2F0JRDLHE3xGSuA0P2ZFIYTpQQ%3D%3D"); /*
																															 * Service
																															 * Key
																															 */
		URL url = new URL(urlBuilder.toString());
		HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		conn.setRequestMethod("GET");
		conn.setRequestProperty("Content-type", "application/xml");
		// System.out.println("Response code: " + conn.getResponseCode());
		BufferedReader rd;
		if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
			rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
		} else {
			rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
		}
		StringBuilder sb = new StringBuilder();
		String line;
		while ((line = rd.readLine()) != null) {
			sb.append(line);
		}
		rd.close();
		conn.disconnect();
		// System.out.println(sb.toString());

		CommUtils commUtils = new CommUtils();
		String json = commUtils.xmlToJson(sb.toString());

		// System.out.println(json);
		Map<String, JSONObject> map = commUtils.paramMap(json);

		ObjectMapper objectMapper = new ObjectMapper();

		JSONObject jObj = map.get("response");
		
		JSONObject body = jObj.getJSONObject("body");
		JSONObject items = body.getJSONObject("items");
		JSONArray item = items.getJSONArray("item");

		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();

		if (item != null) {

			int jsonSize = item.length();

			for (int i = 0; i < jsonSize; i++) {

				Map<String, Object> temp = new HashMap<String, Object>();

				JSONObject tempobj = item.getJSONObject(i);

				Iterator it = tempobj.keys();

				while (it.hasNext()) {
					String key = it.next().toString();
					temp.put(key, tempobj.get(key));
				}

				list.add(temp);

			}
		}

		// certService.setCertficationList(list);

	}

	@GetMapping("/getCertLList")
	public Map<String, Object> getCertLList() {
		try {
			List<Map<String, Object>> certLList = certService.getCertLList();
			
			Map<String, Object> response = new HashMap<String, Object>();
	
			response.put("certLList", certLList);
			System.out.println(response);
			return response;
			
		} catch(Exception e){
			Map<String, Object> errorMap = new HashMap<String, Object>();
			errorMap.put("error",e.getMessage());
			return errorMap;
		}
	}
	
	@GetMapping("/getCertMList")
	public Map<String, Object> getCertMList(@RequestParam("obligfldnm") String obligfldnm) {
		try {
			System.out.println(obligfldnm);
			
			List<Map<String, Object>> certMList = certService.getCertMList(obligfldnm);
			
			Map<String, Object> response = new HashMap<String, Object>();
	
			response.put("certMList", certMList);
			System.out.println(response);
			return response;
			
		} catch(Exception e){
			Map<String, Object> errorMap = new HashMap<String, Object>();
			errorMap.put("error",e.getMessage());
			return errorMap;
		}
	}
	
	@GetMapping("/getCertSList")
	public Map<String, Object> getCertSList(@RequestParam("mdobligfldnm") String mdobligfldnm) {
		try {
			System.out.println(mdobligfldnm);
			
			List<Map<String, Object>> certSList = certService.getCertSList(mdobligfldnm);
			
			Map<String, Object> response = new HashMap<String, Object>();
	
			response.put("certSList", certSList);
			System.out.println(response);
			return response;
			
		} catch(Exception e){
			Map<String, Object> errorMap = new HashMap<String, Object>();
			errorMap.put("error",e.getMessage());
			return errorMap;
		}
	}

	@GetMapping("/testList")
	public void testList(String[] args) throws IOException, InterruptedException {

		List<String> jmcdList = certService.getJmcdList();
		// System.out.println("jmcdList");

		for (int i = 0; i < jmcdList.size(); i++) {
			StringBuilder urlBuilder = new StringBuilder(
					"http://openapi.q-net.or.kr/api/service/rest/InquiryTestInformationNTQSVC/getJMList"); /* URL */
			urlBuilder.append("?" + URLEncoder.encode("jmCd", "UTF-8") + "="
					+ URLEncoder.encode(jmcdList.get(i), "UTF-8")); /* 종목코드 */
			urlBuilder.append("&" + URLEncoder.encode("serviceKey", "UTF-8") + "="
					+ "uFezCoycg2tzO%2F3YbMtuevHdoqHsYNVyZFxo7m7%2FzxR4d9UKxEotUcHCaaawwmChdB%2B1ZL%2B8oMzqnVKrz4C2dQ%3D%3D"); /*
																																 * Service
																																 * Key
																																 */
			URL url = new URL(urlBuilder.toString());

			// System.out.println(urlBuilder.toString());
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("GET");
			conn.setRequestProperty("Content-type", "application/xml");
			// System.out.println("Response code: " + conn.getResponseCode());
			BufferedReader rd;
			if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
				rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			} else {
				rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
			}
			StringBuilder sb = new StringBuilder();
			String line;
			while ((line = rd.readLine()) != null) {
				sb.append(line);
			}
			rd.close();
			conn.disconnect();
			// System.out.println(sb.toString());

			CommUtils commUtils = new CommUtils();
			String json = commUtils.xmlToJson(sb.toString());

			// System.out.println(json);
			Map<String, JSONObject> map = commUtils.paramMap(json);

			ObjectMapper objectMapper = new ObjectMapper();

			JSONObject jObj = map.get("response");
			System.out.println(jObj.toString());
			
			if(!jObj.get("body").equals("")) {
				JSONObject body = jObj.getJSONObject("body");
				
				
				if(!body.get("items").equals("")) {
					JSONObject items = body.getJSONObject("items");
					
					if (items.toString().indexOf("[") != -1) {
						JSONArray item = items.getJSONArray("item");
		
						List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		
						if (item != null) {
		
							int jsonSize = item.length();
		
							for (int t = 0; t < jsonSize; t++) {
		
								Map<String, Object> temp = new HashMap<String, Object>();
		
								JSONObject tempobj = item.getJSONObject(t);
		
								Iterator it = tempobj.keys();
		
								while (it.hasNext()) {
									String key = it.next().toString();
									// if(key.equals("contents"))
									temp.put(key, tempobj.get(key));
								}
		
								list.add(temp);
							}
						}
						certService.setCertTestList(list);
					} else {
						JSONObject item = items.getJSONObject("item");
					}
				} else {
					continue;
				}
			} else {
				continue;
			}
		}

	}

	@GetMapping("/testContent")
	public void testContent(String[] args) throws IOException {

		List<String> jmcdList = certService.getJmcdList();
		// System.out.println("jmcdList");

		for (int i = 0; i < jmcdList.size(); i++) {
			StringBuilder urlBuilder = new StringBuilder(
					"http://openapi.q-net.or.kr/api/service/rest/InquiryInformationTradeNTQSVC/getList"); /* URL */
			urlBuilder.append("?" + URLEncoder.encode("jmCd", "UTF-8") + "="
					+ URLEncoder.encode(jmcdList.get(i), "UTF-8")); /* 종목코드 */
			urlBuilder.append("&" + URLEncoder.encode("serviceKey", "UTF-8")
					+ "=ySQ1XKt4a%2BcNW7xeGq2VNZ%2Bjn7X1%2BXoOZBxD6rYtHIULgxkiUXwv0Dg5Rb8Re%2F0JRDLHE3xGSuA0P2ZFIYTpQQ%3D%3D"); /*
																																 * Service
																																 * Key
																																 */
			URL url = new URL(urlBuilder.toString());
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("GET");
			conn.setRequestProperty("Content-type", "application/xml");
			 System.out.println("Response code: " + conn.getResponseCode());
			BufferedReader rd;
			if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
				rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			} else {
				rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
			}
			StringBuilder sb = new StringBuilder();
			String line;
			while ((line = rd.readLine()) != null) {
				sb.append(line);
			}
			rd.close();
			conn.disconnect();
			 System.out.println(sb.toString());

			CommUtils commUtils = new CommUtils();
			String json = commUtils.xmlToJson(sb.toString());

			 System.out.println(json);
			Map<String, JSONObject> map = commUtils.paramMap(json);

			ObjectMapper objectMapper = new ObjectMapper();

			JSONObject jObj = map.get("response");
			
			if(!jObj.get("body").equals("")) {
				JSONObject body = jObj.getJSONObject("body");
				
				
				if(!body.get("items").equals("")) {
					JSONObject items = body.getJSONObject("items");
					
					if (items.toString().indexOf("[") != -1) {
						JSONArray item = items.getJSONArray("item");
		
						List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		
						if (item != null) {
		
							int jsonSize = item.length();
		
							for (int t = 0; t < jsonSize; t++) {
		
								Map<String, Object> temp = new HashMap<String, Object>();
		
								JSONObject tempobj = item.getJSONObject(t);
		
								Iterator it = tempobj.keys();
		
								while (it.hasNext()) {
									String key = it.next().toString();
									
									if(key.equals("contents"))
										temp.put(key, tempobj.get(key));
									else if(key.equals("jmfldnm"))
										temp.put(key, tempobj.get(key));
								}
		
								list.add(temp);
							}
						}
						certService.setCertContents(list);
					} else {
						JSONObject item = items.getJSONObject("item");
					}
				} else {
					continue;
				}
			} else {
				continue;
			}
		}
	}
}
