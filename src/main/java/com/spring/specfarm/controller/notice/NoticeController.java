package com.spring.specfarm.controller.notice;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.specfarm.dto.ResponseDTO;
import com.spring.specfarm.entity.Brch;
import com.spring.specfarm.entity.Lost;
import com.spring.specfarm.entity.Notice;
import com.spring.specfarm.service.notice.NoticeService;

@RestController
@RequestMapping("/cs")
public class NoticeController {
	@Autowired
	private NoticeService noticeService;
	
	//공지사항시작
	//NoticeList 반환
	@GetMapping("")
	public Map<String, Object> getNoticeList(@PageableDefault(page = 0, size = 8, sort="noticeIdx" ,direction=Direction.DESC) Pageable pageable){
		try {
			Page<Notice> noticeList = noticeService.getNoticeList(pageable);
			
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
	public Map<String, Object> insertNoice(@ModelAttribute Notice notice){
		try {
			int noticeIdx = noticeService.insertNotice(notice);

			
			Map<String, Object> response = new HashMap<String, Object>();
			response.put("noticeIdx", noticeIdx);
			
			return response;
			
		}catch(Exception e){
			Map<String, Object> errorMap = new HashMap<String, Object>();
			errorMap.put("error",e.getMessage());
			return errorMap;
		}
	}

	//Notice 반환
	@GetMapping("/{noticeId}")
	public Map<String, Object> getNotice(@PathVariable int noticeId){
		try {
			Notice notice = noticeService.getNotice(noticeId);
			
			Map<String, Object> response = new HashMap<String, Object>();
			response.put("notice", notice);
			
			return response;
			
		}catch(Exception e){
			Map<String, Object> errorMap = new HashMap<String, Object>();
			errorMap.put("error",e.getMessage());
			return errorMap;
		}
	}
	// 분실물
//	@GetMapping("/getLosts")
//	public ResponseEntity<?> callApiWithXml() {
//		String apiLostUrl = "http://openapi.q-net.or.kr/api/service/rest/InquiryExamLossSVC/getList?" + "pageNo=1"
//				+ "&numOfRows=10" + "&brchCd=02"
//				+ "&serviceKey=ySQ1XKt4a%2BcNW7xeGq2VNZ%2Bjn7X1%2BXoOZBxD6rYtHIULgxkiUXwv0Dg5Rb8Re%2F0JRDLHE3xGSuA0P2ZFIYTpQQ%3D%3D";
//
//		try {
//			Document document = (Document) DocumentBuilderFactory.newInstance().newDocumentBuilder().parse(apiLostUrl);
//			document.getDocumentElement().normalize();
//
//			// documentElement = response
//			Element element = document.getDocumentElement();
//			// items tag > item (지사 정보)
//			NodeList items = element.getElementsByTagName("items").item(0).getChildNodes();
//
//			List<Lost> lostList = new ArrayList<>();
//			
//
//			for (int i = 0; i < items.getLength(); i++) {
//				Element item = (Element) items.item(i);
//
//				Lost lost = new Lost();
//				lost.setBrchName(Api.getTagValue("brchNm", item));
//				lost.setLostDate(Api.getTagValue("lossDt", item));
//				lost.setLostCat(Api.getTagValue("lossKind", item));
//				lost.setLostItem(Api.getTagValue("lossNm", item));
//				lost.setLostLoc(Api.getTagValue("lossPlce", item));
//				lost.setLostDate(Api.getTagValue("regDt", item));
//
//				lostList.add(lost);
//			}
//			
//			noticeService.saveLosts(lostList);
//			
//			System.out.println(lostList);
//
//		} catch (SAXException e) {
//			e.printStackTrace();
//		} catch (IOException e) {
//			e.printStackTrace();
//		} catch (ParserConfigurationException e) {
//			e.printStackTrace();
//		}
//		
//		return null;
//
//	}

	@GetMapping("/getLosts")
	public Map<String, Object> getLosts() {
		List<Lost> lostList = noticeService.getLosts();
		List<Brch> brchList = noticeService.getBrch();
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		resultMap.put("lostList", lostList);
		resultMap.put("brchList", brchList);

		return resultMap;

	}

	// 지사
//	@GetMapping("/getBrch")
//	public ResponseEntity<?> getBrch() {
//		String apiBrchUrl = "http://openapi.q-net.or.kr/api/service/rest/InquiryBrchSVC/getList?"
//				+ "&serviceKey=uFezCoycg2tzO%2F3YbMtuevHdoqHsYNVyZFxo7m7%2FzxR4d9UKxEotUcHCaaawwmChdB%2B1ZL%2B8oMzqnVKrz4C2dQ%3D%3D"
//				+ "&pageNo=1" + "&numOfRows=100";
//
//		try {
//			Document document = (Document) DocumentBuilderFactory.newInstance().newDocumentBuilder().parse(apiBrchUrl);
//			document.getDocumentElement().normalize();
//
//			// documentElement = response
//			Element element = document.getDocumentElement();
//			// items tag > item (지사 정보)
//			NodeList items = element.getElementsByTagName("items").item(0).getChildNodes();
//
//			List<Brch> brchList = new ArrayList<>();
//
//			for (int i = 0; i < items.getLength(); i++) {
//				Element item = (Element) items.item(i);
//
//				Brch brch = new Brch();
//				brch.setBrchName(Api.getTagValue("brchNm", item));
//				brch.setBrchTrthName(Api.getTagValue("brchTrthNm", item));
//				brch.setBrchAddr(Api.getTagValue("addr", item));
//				brch.setBrchTel(Api.getTagValue("telNo", item));
//
//				brchList.add(brch);
//			}
//
//			noticeService.saveBrch(brchList);
//
//			List<BrchDTO> brchDTOList = new ArrayList<BrchDTO>();
//
//			for (Brch brch : brchList) {
//				BrchDTO brchDTO = new BrchDTO();
//				brchDTO.setBrchName(brch.getBrchName());
//				brchDTO.setBrchTrthName(brch.getBrchTrthName());
//				brchDTO.setBrchAddr(brch.getBrchAddr());
//				brchDTO.setBrchTel(brch.getBrchTel());
//
//				brchDTOList.add(brchDTO);
//			}
//
//			ResponseDTO<BrchDTO> response = new ResponseDTO<>();
//
//			response.setData(brchDTOList);
//
//			return ResponseEntity.ok().body(response);
//
//		} catch (SAXException e) {
//			e.printStackTrace();
//		} catch (IOException e) {
//			e.printStackTrace();
//		} catch (ParserConfigurationException e) {
//			e.printStackTrace();
//		}
//
//		return null;
//	}

	@GetMapping("/getBrchs")
	public ResponseEntity<?> getBrchs() {
		List<Brch> brchList = noticeService.getBrch();

		ResponseDTO<Brch> response = new ResponseDTO<>();
		response.setData(brchList);

		return ResponseEntity.ok().body(response);
	}
}
