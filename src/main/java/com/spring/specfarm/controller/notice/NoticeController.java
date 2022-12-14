package com.spring.specfarm.controller.notice;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.spring.specfarm.common.CommUtils;
import com.spring.specfarm.common.FileUtils;
import com.spring.specfarm.entity.Brch;
import com.spring.specfarm.entity.Lost;
import com.spring.specfarm.entity.Notice;
import com.spring.specfarm.entity.User;
import com.spring.specfarm.service.notice.NoticeService;
import com.spring.specfarm.service.user.UserService;

@RestController
@RequestMapping("/cs")
public class NoticeController {
	@Autowired
	private NoticeService noticeService;
	
	@Autowired
	private UserService userService;
	
	//공지사항
	//NoticeList 반환
	@GetMapping("")
	public Map<String, Object> getNoticeList(@PageableDefault(page = 0, size = 15, sort="noticeIdx" ,direction=Direction.DESC) Pageable pageable, @RequestParam String searchKeyword){
		try {
			Page<Notice> noticeList = noticeService.getNoticeList(searchKeyword,pageable);

			Map<String, Object> response = new HashMap<String, Object>();
			response.put("noticeList", noticeList);
				
			return response;
		}catch(Exception e){
			Map<String, Object> errorMap = new HashMap<String, Object>();
			errorMap.put("error",e.getMessage());
			return errorMap;
		}
	}

	//Notice 작성
	@PostMapping("/write")
	public Map<String, Object> insertNoice(@ModelAttribute Notice notice, @AuthenticationPrincipal String userId){
		try {
			Map<String, Object> response = new HashMap<String, Object>();
			
			User user = userService.getUser(userId);
			if(user.getRole().equals("ROLE_ADMIN")) {
				int noticeIdx = noticeService.insertNotice(notice);
				
				response.put("noticeIdx", noticeIdx);		
			}else {
				response.put("result", "not admin");
			}
			return response;
			
		}catch(Exception e){
			Map<String, Object> errorMap = new HashMap<String, Object>();
			errorMap.put("error",e.getMessage());
			return errorMap;
		}
	}

	//Notice 반환
	@GetMapping("/{noticeId}")
	public Map<String, Object> getNotice(@PathVariable int noticeId, @RequestParam String searchKeyword){
		try {
			Notice notice = noticeService.getNotice(noticeId);
			Notice prev = noticeService.getPrev(searchKeyword, noticeId);
			Notice next = noticeService.getNext(searchKeyword, noticeId);
			Map<String, Object> response = new HashMap<String, Object>();
			response.put("notice", notice);
			response.put("prev", prev);
			response.put("next", next);
			
			return response;
			
		}catch(Exception e){
			Map<String, Object> errorMap = new HashMap<String, Object>();
			errorMap.put("error",e.getMessage());
			return errorMap;
		}
	}
	
	//Notice 이미지 업로드
	@PostMapping("/notice/upload/images")
	public Map<String, Object> uploadImages(@ModelAttribute MultipartFile image, HttpSession session){
		try {
				
			FileUtils fileUtils = new FileUtils();
			
			String fileName = fileUtils.parseFileInfo(session, image, "cs/notice").get("FileName");
			
			Map<String, Object> response = new HashMap<String, Object>();
			response.put("file", fileName);
			
			return response;
			
		}catch(Exception e){
			Map<String, Object> errorMap = new HashMap<String, Object>();
			errorMap.put("error",e.getMessage());
			return errorMap;
		}
	}
	
	// Notice 이미지 삭제
	@PostMapping("/notice/delete/images")
	public Map<String, Object> deleteImages(@RequestBody List<String> imagesList, HttpSession session) {
		try {
			String rootPath = session.getServletContext().getRealPath("/");

			String attachPath = "../frontend/public/upload/cs/notice/";
			for (String name : imagesList) {
				File file = new File(rootPath + attachPath + name);

				if (file.exists()) {
					if (file.delete()) {
						System.out.println("파일삭제 성공");
					} else {
						System.out.println("파일삭제 실패");
					}
				} else {
					System.out.println("파일이 존재하지 않습니다.");
				}
			}

			Map<String, Object> response = new HashMap<String, Object>();
			response.put("result", "success");

			return response;

		} catch (Exception e) {
			Map<String, Object> errorMap = new HashMap<String, Object>();
			errorMap.put("error", e.getMessage());
			return errorMap;
		}
	}

	//Notice 삭제
	@GetMapping("/delete")
	public Map<String, Object> deleteNotice(@RequestParam String noticeIdx){
		try {
			noticeService.deleteNotice(noticeIdx);
			
			Map<String, Object> response = new HashMap<String, Object>();
			response.put("result", "success");
			
			return response;
			
		}catch(Exception e){
			Map<String, Object> errorMap = new HashMap<String, Object>();
			errorMap.put("result","failed");
			errorMap.put("error",e.getMessage());
			return errorMap;
		}
	}
	
	//=======================================================================================//
	// 분실물
	@GetMapping("/saveLosts")
	public void saveLosts() throws IOException {
        List<Lost> list = new ArrayList<>();
        int lostIdx = 1;
        
		for(int brchCd = 1; brchCd <= 24; brchCd++) {
			StringBuilder urlBuilder = new StringBuilder("http://openapi.q-net.or.kr/api/service/rest/InquiryExamLossSVC/getList"); /*URL*/
			urlBuilder.append("?" + URLEncoder.encode("ServiceKey","UTF-8") + "=uFezCoycg2tzO%2F3YbMtuevHdoqHsYNVyZFxo7m7%2FzxR4d9UKxEotUcHCaaawwmChdB%2B1ZL%2B8oMzqnVKrz4C2dQ%3D%3D"); /*Service Key*/
			urlBuilder.append("&" + URLEncoder.encode("brchCd","UTF-8") +"=" + URLEncoder.encode(String.format("%02d", brchCd), "UTF-8")); /*지사 코드*/
			urlBuilder.append("&" + URLEncoder.encode("pageNo","UTF-8") +"=" + URLEncoder.encode("1", "UTF-8")); /*페이지*/
			urlBuilder.append("&" + URLEncoder.encode("numOfRows","UTF-8") +"=" + URLEncoder.encode("10", "UTF-8")); /*페이지당 데이터 수*/
	        
	        URL url = new URL(urlBuilder.toString());
	        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
	        conn.setRequestMethod("GET");
	        conn.setRequestProperty("Content-type", "application/xml");
	        BufferedReader rd;
	        
	        // 서비스코드가 정상 : 200~300사이의 숫자
	        if(conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
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
	        
	        CommUtils commUtils = new CommUtils();
	        String json = commUtils.xmlToJson(sb.toString());
	        
	        Map<String, JSONObject> map = commUtils.paramMap(json);
	        
	        JSONObject jObj = map.get("response");
	        JSONObject body = jObj.getJSONObject("body");
	        JSONObject items = body.getJSONObject("items");
	        
	        if(items.toString().indexOf("[") != -1) {
	        	JSONArray item = items.getJSONArray("item");
	        	
				if (item != null) {
				   
					int jsonSize = item.length();
					     
					for (int i = 0; i < jsonSize; i++) {
						JSONObject tempobj = item.getJSONObject(i);
						Lost temp = new Lost();
						Brch tempBrch = new Brch();
						
						    	 
						tempBrch.setBrchName(tempobj.getString("brchNm"));
						temp.setBrch(tempBrch);
						temp.setLostCat(tempobj.get("lossKind").toString());
						temp.setLostDate(tempobj.get("lossDt").toString());
						temp.setLostIdx(lostIdx++);
						temp.setLostItem(tempobj.get("lossNm").toString());
						temp.setLostLoc(tempobj.get("lossPlce").toString());
					
						list.add(temp);
					}
				}
	        } else {
	        	JSONObject item = items.getJSONObject("item");
	        	
	        	Lost temp = new Lost();
				Brch tempBrch = new Brch();
				
				    	 
				tempBrch.setBrchName(item.getString("brchNm"));
				
				temp.setBrch(tempBrch);
				temp.setLostCat(item.get("lossKind").toString());
				temp.setLostDate(item.get("lossDt").toString());
				temp.setLostItem(item.get("lossNm").toString());
				temp.setLostLoc(item.get("lossPlce").toString());
				
				list.add(temp);
	        }       
	        
		}		
		noticeService.saveLosts(list);
	}
	

//		@GetMapping("/getLosts")
//		public Map<String, Object> getLosts() {
//			List<Map<String, Object>> lostList = noticeService.getLosts();
//			List<Brch> brchList = noticeService.getBrchs();
//	
//			Map<String, Object> resultMap = new HashMap<String, Object>();
//	
//			resultMap.put("lostList", lostList);
//			resultMap.put("brchList", brchList);
//	
//			return resultMap;
//		}

	// 지사	
	@GetMapping("/saveBrchs")
	public void saveBrchs() throws IOException {
		List<Brch> list = new ArrayList<>();

		StringBuilder urlBuilder = new StringBuilder(
				"http://openapi.q-net.or.kr/api/service/rest/InquiryBrchSVC/getList"); // URL
		urlBuilder.append("?" + URLEncoder.encode("ServiceKey", "UTF-8") + "=uFezCoycg2tzO%2F3YbMtuevHdoqHsYNVyZFxo7m7%2FzxR4d9UKxEotUcHCaaawwmChdB%2B1ZL%2B8oMzqnVKrz4C2dQ%3D%3D"); // Service Key
		urlBuilder.append("&" + URLEncoder.encode("pageNo", "UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); // 페이지
		urlBuilder.append("&" + URLEncoder.encode("numOfRows", "UTF-8") + "=" + URLEncoder.encode("100", "UTF-8")); // 페이지당 데이터 수

		URL url = new URL(urlBuilder.toString());
		HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		conn.setRequestMethod("GET");
		conn.setRequestProperty("Content-type", "application/xml");
		BufferedReader rd;

		// 서비스코드가 정상 : 200~300사이의 숫자
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


		CommUtils commUtils = new CommUtils();
		String json = commUtils.xmlToJson(sb.toString());

		Map<String, JSONObject> map = commUtils.paramMap(json);

		JSONObject jObj = map.get("response");
		JSONObject body = jObj.getJSONObject("body");
		JSONObject items = body.getJSONObject("items");
		JSONArray item = items.getJSONArray("item");

		if (item != null) {

			int jsonSize = item.length();

			for (int i = 0; i < jsonSize; i++) {
				JSONObject tempobj = item.getJSONObject(i);
				Brch temp = new Brch();
				
				temp.setBrchAddr(tempobj.getString("addr"));
				temp.setBrchName(tempobj.getString("brchNm"));
				temp.setBrchTel(tempobj.getString("telNo"));
				temp.setBrchTrthName(tempobj.getString("brchTrthNm"));


				list.add(temp);
			}
		}
		noticeService.saveBrchs(list);
	}

	// 분실물 검색
	@GetMapping("/getLosts/search")
	public Map<String, Object> getSearchLosts(@RequestParam("searchType") String searchType,
			@RequestParam("searchText") String searchText) {
		List<Map<String, Object>> lostList = new ArrayList<>();
		
		lostList = noticeService.getSearchLosts(searchType, searchText);
		List<Brch> brchList = noticeService.getBrchs();
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		resultMap.put("lostList", lostList);
		resultMap.put("brchList", brchList);
		
		return resultMap;
	}
}
