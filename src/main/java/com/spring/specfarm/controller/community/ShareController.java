package com.spring.specfarm.controller.community;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.spring.specfarm.common.FileUtils;
import com.spring.specfarm.dto.ResponseDTO;
import com.spring.specfarm.entity.Share;
import com.spring.specfarm.entity.ShareFile;
import com.spring.specfarm.entity.ShareReReply;
import com.spring.specfarm.entity.ShareReply;
import com.spring.specfarm.entity.User;
import com.spring.specfarm.service.community.ShareService;

@RestController
@RequestMapping("/community/share")
public class ShareController {

	@Autowired
	ShareService shareService;
	
	// Share List
	@GetMapping("")
	public Map<String, Object> getShareList(
			@PageableDefault(page = 0, size = 8, sort="shareIdx", direction = Direction.DESC) Pageable pageable, @RequestParam(required = false) String searchKeyword ) {
		try {
			Map<String, Object> resultMap = new HashMap<String, Object>();
			
			Page<Share> shareList = shareService.getShareList(searchKeyword, pageable);
			
			//share 댓글 수
			for(Share share: shareList) {
				share.setCountReply(shareService.getShareReplyCount(share.getShareIdx()));
			}
			
			resultMap.put("shareList", shareList);
		
			return resultMap;
		} catch(Exception e) {
			Map<String, Object> errorMap = new HashMap<String, Object>();
			errorMap.put("error", e.getMessage());
			return errorMap;
		}
	}
	
	// Insert Share
	@PostMapping("/newShare")
	public Map<String, Object> insertShare(MultipartHttpServletRequest multipartServletRequest,
			HttpServletRequest request, Share share, @AuthenticationPrincipal String userId, @RequestParam Boolean hasImg) {
		try {
			User user = new User();
			user.setUserId(userId);
			share.setUser(user);
			int shareIdx = 0;
			// Share File List
			List<ShareFile> shareFileList = new ArrayList<>();

			//파일 이름 받기
			Iterator<String> i = multipartServletRequest.getFileNames();
			
			// file data list
			if (!hasImg) {
				share.setShareImgName("shareImg.png");
			}

			while (i.hasNext()) {
				// sigleImg 값 확인

				List<MultipartFile> fileList = multipartServletRequest.getFiles(i.next());

				System.out.println(fileList);
				for (MultipartFile file : fileList) {
					System.out.println(file);
					if (!file.isEmpty()) {

						FileUtils fileUtils = new FileUtils();
						Map<String, String> fileInfo = fileUtils.parseFileInfo(request.getSession(), file, "share");

						ShareFile shareFile = new ShareFile();

						if (hasImg) {
							share.setShareImgName(fileInfo.get("FileName"));
							hasImg = false;
						} else {

							shareFile.setShare(share);
							shareFile.setShareFileName(fileInfo.get("FileName"));
							shareFile.setOriginalFileName(fileInfo.get("FileOrgName"));
							shareFileList.add(shareFile);
						}
					}

				}
			}

			shareIdx = shareService.insertShare(share);

			shareService.insertShareFileList(shareFileList);

			Map<String, Object> response = new HashMap<String, Object>();
			response.put("shareIdx", shareIdx);
			return response;
		} catch (Exception e) {
			Map<String, Object> errorMap = new HashMap<String, Object>();
			errorMap.put("error", e.getMessage());
			return errorMap;
		}
	}

	//Share Detail
	@GetMapping("/shareDetail")
	public Map<String, Object> shareDetail(int shareIdx){
		try {
			Map<String, Object> response = new HashMap<String, Object>();
			
			Share share = shareService.shareDetail(shareIdx);
			
			share.setShareCount(share.getShareCount()+1);
			
			shareService.insertShare(share);
			
			List<ShareFile> shareFileList = shareService.getfileList(shareIdx);
			
			response.put("share", share);
			response.put("shareFileList", shareFileList);
			
			return response;
		} catch(Exception e) {
			Map<String, Object> errorMap = new HashMap<String, Object>();
			errorMap.put("error", e.getMessage());
			return errorMap;
		}
	}
	
	//Share Reply List
	@GetMapping("/comment/{id}")
	
	public ResponseEntity<?> getShareReply(@PathVariable int id){
		System.out.println(id);
		try {
			List<ShareReply> shareReplyList = shareService.getShareReplyList(id);
			
			for(ShareReply shareReply: shareReplyList) {
				shareReply.setCountReReply(shareService.getShareReReplyCount(shareReply));
			}
			
			ResponseDTO<ShareReply> response = new ResponseDTO<>();
			
			response.setData(shareReplyList);
			
			return ResponseEntity.ok().body(response);
		} catch (Exception e) {
			ResponseDTO<ShareReply> response = new ResponseDTO<>();
			response.setError(e.getMessage());
			return ResponseEntity.badRequest().body(response);		
		}
		
	}
	
	// Share ReReply List
	@GetMapping("/{id}/commentReply")
	public ResponseEntity<?> getShareReReply(@PathVariable int id, @RequestParam int commentIdx){
		try {
			//System.out.println(1);
			List<ShareReReply> shareReReplyList = shareService.getShareReReplyList(id, commentIdx);
			//System.out.println(2);
			ResponseDTO<ShareReReply> response = new ResponseDTO<>();
			response.setData(shareReReplyList);
			
			return ResponseEntity.ok().body(response);
		} catch(Exception e) {
			ResponseDTO<ShareReply> response = new ResponseDTO<>();
			response.setError(e.getMessage());
			return ResponseEntity.badRequest().body(response);
		}
	}
	
	// Insert Share Reply
	@PostMapping("/{shareIdx}/insertComment")
	public Map<String, Object> insertComment(@PathVariable int shareIdx, @RequestBody ShareReply shareReply, @AuthenticationPrincipal String userId){
		try {
			shareReply.setUser(shareService.getUser(userId));
			shareReply.setShareIdx(shareIdx);
			shareReply.setShareReplyIdx(shareService.getShareReplyIdx(shareIdx));
			
			List<ShareReply> shareReplyList = shareService.insertShareReply(shareReply);
			Map<String, Object> response = new HashMap<String, Object>();
			response.put("shareReplyList", shareReplyList);
			return response;
		} catch (Exception e) {
			Map<String, Object> errorMap = new HashMap<String, Object>();
			errorMap.put("error", e.getMessage());
			return errorMap;
		}
	}
	
	// Insert Share ReReply
	@PostMapping("/{shareIdx}/insertCommentReply")
	public Map<String, Object> insertCommentReply(@PathVariable int shareIdx, @RequestBody ShareReReply shareReReply, @AuthenticationPrincipal String userId){
		try {
			User user = new User();
			user.setUserId(userId);
			shareReReply.setUser(user);
			shareReReply.setShareReReplyIdx(shareService.getShareReReplyIdx(shareIdx, shareReReply.getShareReply().getShareReplyIdx()));
			
			List<ShareReReply> shareReReplyList = shareService.insertShareReReply(shareReReply);
			Map<String, Object> response = new HashMap<String, Object>();
			
			response.put("shareReReplyList", shareReReplyList);
			
			return response;
			
		} catch (Exception e) {
			Map<String, Object> errorMap = new HashMap<String, Object>();
			errorMap.put("error",e.getMessage());
			return errorMap;
		}
	}
	
	// Delete Share
	@DeleteMapping("/delete")
	public void deleteAsk(@RequestParam int shareIdx){
		try {
			shareService.deleteShare(shareIdx);
			
		} catch (Exception e) {
			Map<String, Object> errorMap = new HashMap<String, Object>();
			errorMap.put("error",e.getMessage());
		}
	}

	// Share state
	@PostMapping("/shareYn")
	public Map<String, Object> shareState(@AuthenticationPrincipal String userId, @RequestBody Share share){
		try {
			Map<String, Object> resultMap = new HashMap<String, Object>();
			
			String shareYn = shareService.shareState(share);
			
			System.out.println(shareYn);
			
			resultMap.put("shareYn", shareYn);
			
			return resultMap;

		}catch (Exception e) {
			Map<String, Object> errorMap = new HashMap<String, Object>();
			errorMap.put("error",e.getMessage());
			return errorMap;
		}
	}
	

	// Update Share
	@PostMapping("/edit")
	public Map<String, Object> editShare(MultipartHttpServletRequest multipartServletRequest,
			HttpServletRequest request, Share share, @RequestParam String originFileList, @AuthenticationPrincipal String userId, @RequestParam Boolean hasImg) {
		try {
			System.out.println(originFileList);
			
			JSONArray jsonArray = new JSONArray(originFileList);
			
			System.out.println(jsonArray);
			
			List<Map<String, Object>> editFileList = new ArrayList<Map<String, Object>>();
			
			if(jsonArray != null) {
				
				int jsonSize = jsonArray.length();
				
				for (int i = 0; i < jsonSize; i++) {

					Map<String, Object> temp = new HashMap<String, Object>();
					
					JSONObject tempobj = jsonArray.getJSONObject(i);
							
					Iterator it = tempobj.keys();
					
					while(it.hasNext()) {
						String key = it.next().toString();
						temp.put(key, tempobj.get(key));
					}
					
					editFileList.add(temp);
				}
			}
			
			User user = new User();
			user.setUserId(userId);
			share.setUser(user);
			int shareIdx = 0;
			// Share File List
			List<ShareFile> shareFileList = new ArrayList<>();

			//파일 이름 받기
			Iterator<String> i = multipartServletRequest.getFileNames();
			
			// file data list
			if (!hasImg) {
				share.setShareImgName("shareImg.png"); //첨부하는 이미지(sigleImg) 없으면 기본이미지 설정
			}

			while (i.hasNext()) {

				List<MultipartFile> fileList = multipartServletRequest.getFiles(i.next());

				System.out.println(fileList);
				for (MultipartFile file : fileList) {
					System.out.println(file);
					if (!file.isEmpty()) {

						FileUtils fileUtils = new FileUtils();
						Map<String, String> fileInfo = fileUtils.parseFileInfo(request.getSession(), file, "share");

						ShareFile shareFile = new ShareFile();

						if (hasImg) {
							share.setShareImgName(fileInfo.get("FileName"));
							hasImg = false;
						} else {

							shareFile.setShare(share);
							shareFile.setShareFileName(fileInfo.get("FileName"));
							shareFile.setOriginalFileName(fileInfo.get("FileOrgName"));
							shareFileList.add(shareFile);
						}
					}

				}
			}

			shareIdx = shareService.insertShare(share);
			
			System.out.println("222222222222222222222222222"+editFileList.toString());
			if(editFileList.size() > 0)
				shareService.editFileList(editFileList);

			shareService.insertShareFileList(shareFileList);

			Map<String, Object> response = new HashMap<String, Object>();
			response.put("share", share);
			return response;
		} catch (Exception e) {
			Map<String, Object> errorMap = new HashMap<String, Object>();
			errorMap.put("error", e.getMessage());
			return errorMap;
		}
	}
	
}
 