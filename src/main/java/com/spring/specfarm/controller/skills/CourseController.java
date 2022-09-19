package com.spring.specfarm.controller.skills;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.ByteBuffer;
import java.nio.CharBuffer;
import java.nio.charset.Charset;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.XML;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spring.specfarm.dto.ConditionDTO;
import com.spring.specfarm.dto.areaItemsDTO;
import com.spring.specfarm.dto.jobItemsDTO;


@RestController
@RequestMapping("/skills")
public class CourseController {

	@GetMapping("/conditionRequest")
	// 지역, 직무 분류 데이터를 API에 요청
	public String conditionRequestToApi(@RequestParam String code) throws IOException, JSONException {
		
		// 1. URL을 만들기 위한 StringBuilder.
        StringBuilder urlBuilder = new StringBuilder("https://www.hrd.go.kr/jsp/HRDP/HRDPO00/HRDPOA90/HRDPOA90_1.jsp"); /*URL*/
        // 2. 오픈 API의요청 규격에 맞는 파라미터 생성, 발급받은 인증키.
        urlBuilder.append("?" + URLEncoder.encode("returnType","UTF-8") + "=" + URLEncoder.encode("XML", "UTF-8")); /*XML 또는 JSON*/
        urlBuilder.append("&" + URLEncoder.encode("outType","UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); /*Out Type 1: 리스트, 2: 상세*/
        urlBuilder.append("&" + URLEncoder.encode("authKey","UTF-8") + "=iuetUvIPndgwsAJkxuhhvEb7GdhK6wvV"); /*Service Key*/
        urlBuilder.append("&" + URLEncoder.encode("srchType","UTF-8") + "=" + URLEncoder.encode(code, "UTF-8")); /* 00: 대분류, 01: 중분류 */
        
        return makeCatList(urlBuilder);
        
	}
	
	
	@PostMapping("/listRequest")
	// 화면 단에서 검색조건과 키워드를 받아 해당 조건을 포함하는 리스트를 API에 요청
	public String listRequestToApi(@RequestBody ConditionDTO conditionDTO) throws IOException, JSONException {
		
		JSONArray searchResult = new JSONArray();
		
		if (!conditionDTO.getSearchText().isEmpty()) {
			
			System.out.println(conditionDTO.getSearchText());
		}
		
		LocalDateTime dateTime = LocalDateTime.now();
		
		String today = dateTime.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
		String plusMonth = dateTime.plusMonths(3).format(DateTimeFormatter.ofPattern("yyyyMMdd"));
		
		
		
		// 1. URL을 만들기 위한 StringBuilder.
        StringBuilder urlBuilder = new StringBuilder("https://www.hrd.go.kr/jsp/HRDP/HRDPO00/HRDPOA60/HRDPOA60_1.jsp"); /*URL*/
        // 2. 오픈 API의요청 규격에 맞는 파라미터 생성, 발급받은 인증키.
        urlBuilder.append("?" + URLEncoder.encode("returnType","UTF-8") + "=" + URLEncoder.encode("XML", "UTF-8")); /*XML 또는 JSON*/
        urlBuilder.append("&" + URLEncoder.encode("authKey","UTF-8") + "=iuetUvIPndgwsAJkxuhhvEb7GdhK6wvV"); /*Service Key*/
        urlBuilder.append("&" + URLEncoder.encode("pageNum","UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); /* 요청 페이지 개수 */
        if (conditionDTO.getAreaItems().length == 0 && conditionDTO.getJobItems().length == 0) {
        	urlBuilder.append("&" + URLEncoder.encode("pageSize","UTF-8") + "=" + URLEncoder.encode("100", "UTF-8")); /* 한 페이지에 몇 개씩 */
		} else {
			urlBuilder.append("&" + URLEncoder.encode("pageSize","UTF-8") + "=" + URLEncoder.encode("30", "UTF-8")); /* 한 페이지에 몇 개씩 */
		}
        urlBuilder.append("&" + URLEncoder.encode("srchTraStDt","UTF-8") + "=" + URLEncoder.encode(today, "UTF-8")); /* 훈련 시작일 */
        urlBuilder.append("&" + URLEncoder.encode("srchTraEndDt","UTF-8") + "=" + URLEncoder.encode(plusMonth, "UTF-8")); /* 훈련 종료일 */
        urlBuilder.append("&" + URLEncoder.encode("outType","UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); /*Out Type 1: 리스트, 2: 상세*/
        urlBuilder.append("&" + URLEncoder.encode("sort","UTF-8") + "=" + URLEncoder.encode("ASC", "UTF-8")); /* 정렬 방식 */
        urlBuilder.append("&" + URLEncoder.encode("sortCol","UTF-8") + "=" + URLEncoder.encode("TR_STT_DT", "UTF-8")); /* 정렬 기준 */
     
        if (conditionDTO.getAreaItems().length > 0) {
        	// 지역 조건만 있는 경우
        	for (areaItemsDTO areaItem : conditionDTO.getAreaItems()) {
        		StringBuilder urlBuilder2 = new StringBuilder(urlBuilder);
        		urlBuilder2.append("&" + URLEncoder.encode("srchTraArea1","UTF-8") + "=" + URLEncoder.encode(areaItem.getCode().substring(0, 2), "UTF-8"));
        		urlBuilder2.append("&" + URLEncoder.encode("srchTraArea2","UTF-8") + "=" + URLEncoder.encode(areaItem.getCode(), "UTF-8"));
        		
        		if(conditionDTO.getJobItems().length > 0 ) {
        			// 지역 + 직무 조건이 있는 경우
        			for (jobItemsDTO jobItem : conditionDTO.getJobItems()) {
        				StringBuilder urlBuilder3 = new StringBuilder(urlBuilder2);
        				urlBuilder3.append("&" + URLEncoder.encode("srchKeco1","UTF-8") + "=" + URLEncoder.encode(jobItem.getCode().substring(0, 2), "UTF-8"));
        				urlBuilder3.append("&" + URLEncoder.encode("srchKeco2","UTF-8") + "=" + URLEncoder.encode(jobItem.getCode().substring(0, 4), "UTF-8"));
        				urlBuilder3.append("&" + URLEncoder.encode("srchKeco3","UTF-8") + "=" + URLEncoder.encode(jobItem.getCode(), "UTF-8"));
        				
        				// 지역 + 직무 조건 있는 경우 리턴
        				searchResult.put(makeList(urlBuilder3));
        			}
        		}
        		else {
        			// 지역 조건만 있는 경우 리턴
        			searchResult.put(makeList(urlBuilder2));
				}
    		}
        }
        else if(conditionDTO.getJobItems().length > 0 ) {
        	// 직무 조건만 있는 경우
        	for (jobItemsDTO jobItem : conditionDTO.getJobItems()) {
        		StringBuilder urlBuilder2 = new StringBuilder(urlBuilder);
        		urlBuilder2.append("&" + URLEncoder.encode("srchKeco1","UTF-8") + "=" + URLEncoder.encode(jobItem.getCode().substring(0, 2), "UTF-8"));
        		urlBuilder2.append("&" + URLEncoder.encode("srchKeco2","UTF-8") + "=" + URLEncoder.encode(jobItem.getCode().substring(0, 4), "UTF-8"));
        		urlBuilder2.append("&" + URLEncoder.encode("srchKeco3","UTF-8") + "=" + URLEncoder.encode(jobItem.getCode(), "UTF-8"));
				searchResult.put(makeList(urlBuilder2));
			}
        } else {
        	// 아무 조건도 없는 경우
        	searchResult.put(makeList(urlBuilder));
        }
        
        // 각 검색 조건의 결과를 합치고 키워드를 포함하는 검색 결과 리스트를 저장하기 위한 객체 생성
		JSONObject resultResponse = new JSONObject();
		
		for (int i = 0; i < searchResult.length(); i++) {
			// 검색 결과가 있는 리스트만 확인
			if (searchResult.opt(i) != null) {
				// scn_list 객체가 배열인 경우
				if(searchResult.getJSONObject(i).length() > 0) {
					// scn_list 배열 안에 각 과정 데이터를 하나씩 확인
					for (int j = 0; j < searchResult.getJSONObject(i).getJSONArray("scn_list").length(); j++) {
						// 검색어가 있는 경우
						if (!conditionDTO.getSearchText().isEmpty() ) {
							// 검색어 문자열을 포함하는 데이터를 검사해 해당 데이터만 객체에 저장
							if (searchResult.getJSONObject(i).getJSONArray("scn_list").get(j).toString().contains(conditionDTO.getSearchText())) {
								resultResponse.append("scn_list", searchResult.getJSONObject(i).getJSONArray("scn_list").get(j));
							}
							// 검색어가 없는 경우
						} else {
							resultResponse.append("scn_list", searchResult.getJSONObject(i).getJSONArray("scn_list").get(j));
						}
					} 
					// scn_list 객체가 배열이 아닌 경우
				} else {
					resultResponse.append("scn_list", searchResult.getJSONObject(i).get("scn_list"));
				}
			}
		}
        
        String jsonStr = resultResponse.toString(4);
        
//        byte[] euckrStringBuffer  = jsonStr.getBytes(Charset.forName("euc-kr"));
//        
//        Charset euckrCharset = Charset.forName("euc-kr");
//        CharBuffer charBuffer = euckrCharset.decode(ByteBuffer.wrap(euckrStringBuffer));
//        String decodedHelloString = charBuffer.toString();
//
//
//        byte[] utf8StringBuffer = decodedHelloString.getBytes("utf-8");
//
//        System.out.println();
//        System.out.println("utf-8 - length : " + utf8StringBuffer.length);
//        String decodedFromUtf8 = new String(utf8StringBuffer, "utf-8");
//        System.out.println("String from utf-8 : " + decodedFromUtf8);
        
//        System.out.println(jsonStr);
		
        return jsonStr;
        
	}
	
	public JSONObject makeList(StringBuilder urlBuilder) throws IOException, JSONException{
		System.out.println(urlBuilder);
        // 3. URL 객체 생성.
        URL url = new URL(urlBuilder.toString());
        
        String objChk;
        JSONObject json;
        do {
	        // 4. 요청하고자 하는 URL과 통신하기 위한 Connection 객체 생성.
	        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
	        // 5. 통신을 위한 메소드 SET.
	        conn.setRequestMethod("GET");
	        // 6. 통신을 위한 Content-type SET. 
	        conn.setRequestProperty("Content-type", "application/json");
	        // 7. 통신 응답 코드 확인.
        
//        	System.out.println("Response code: " + conn.getResponseCode());
	        // 8. 전달받은 데이터를 BufferedReader 객체로 저장.
	        
	        BufferedReader rd;
	        if(conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
	            rd = new BufferedReader(new InputStreamReader(conn.getInputStream(), "EUC-KR"));
	        } else {
	            rd = new BufferedReader(new InputStreamReader(conn.getErrorStream(), "EUC-KR"));
	        }
	        // 9. 저장된 데이터를 라인별로 읽어 StringBuilder 객체로 저장.
	        StringBuilder sb = new StringBuilder();
	        String line;
	        while ((line = rd.readLine()) != null) {
	            sb.append(line);
	        }
	        // 10. 객체 해제.
	        rd.close();
	        conn.disconnect();
	        // 11. 전달받은 데이터 확인.
//	        System.out.println(sb.toString());
	        
	        // 12. String 형태로 변환된 전달받은 xml 데이터 변수에 저장
	        String xmlStr = sb.toString();
	        // 13. json 객체로 변환하여 저장
	        json = XML.toJSONObject(xmlStr);
	        
	        String jsonStr = json.toString(4);
//	        System.out.println(jsonStr);
	        objChk = jsonStr;
	        
	        
	        if (json.has("HRDNet")) {
	        	if (json.getJSONObject("HRDNet").getInt("scn_cnt") > 0) {
	        		break;
	        	} 
			}
	        
//          System.out.println(objChk);
          
		} while (objChk.contains("HRDNet") == false);
        // 14. indent 4를 넣어 문자열의 개행과 공백을 분리하여 보기 좋게 변환
//        String jsonStr = json.toString(4);
//        System.out.println(jsonStr);
//		return jsonStr;
        return json.getJSONObject("HRDNet").getJSONObject("srchList");
	}
	
	public String makeCatList(StringBuilder urlBuilder) throws IOException, JSONException{
		System.out.println(urlBuilder);
        // 3. URL 객체 생성.
        URL url = new URL(urlBuilder.toString());
        String objChk;
        do {
	        // 4. 요청하고자 하는 URL과 통신하기 위한 Connection 객체 생성.
	        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
	        // 5. 통신을 위한 메소드 SET.
	        conn.setRequestMethod("GET");
	        // 6. 통신을 위한 Content-type SET. 
	        conn.setRequestProperty("Content-type", "application/json");
	        // 7. 통신 응답 코드 확인.
	        
//        	System.out.println("Response code: " + conn.getResponseCode());
            // 8. 전달받은 데이터를 BufferedReader 객체로 저장.
            BufferedReader rd;
            if(conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
                rd = new BufferedReader(new InputStreamReader(conn.getInputStream(), "EUC-KR"));
            } else {
                rd = new BufferedReader(new InputStreamReader(conn.getErrorStream(), "EUC-KR"));
            }
            // 9. 저장된 데이터를 라인별로 읽어 StringBuilder 객체로 저장.
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = rd.readLine()) != null) {
                sb.append(line);
            }
            // 10. 객체 해제.
            rd.close();
            conn.disconnect();
            // 11. 전달받은 데이터 확인.
//            System.out.println(sb.toString());
            
            // 12. String 형태로 변환된 전달받은 xml 데이터 변수에 저장
            String xmlStr = sb.toString();
            // 13. json 객체로 변환하여 저장
            JSONObject json = XML.toJSONObject(xmlStr);
            
            // 14. indent 4를 넣어 문자열의 개행과 공백을 분리하여 보기 좋게 변환
            String jsonStr = json.toString(4);
            
            objChk = jsonStr;
//            System.out.println(objChk);
            
            if (json.has("HRDNet")) {
        		break;
			}
            
		} while (objChk.contains("HRDNet") == false);
        
		return objChk;
	}
	
}
