package com.spring.specfarm.controller.community;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
	
	@GetMapping("/getUser")
	public Map<String, Object> getUser(@AuthenticationPrincipal String userId){
		try {
			User user = shareService.getUser(userId);
			
			Map<String, Object> resultMap = new HashMap<String, Object>();
			resultMap.put("user", user);
		
			
			return resultMap;
		} catch (Exception e) {
			Map<String, Object> errorMap = new HashMap<String, Object>();
			errorMap.put("error",e.getMessage());
			return errorMap;
		}
		
	}

	// Share List
	@GetMapping("")
	public Map<String, Object> getShareList(
			@PageableDefault(page = 0, size = 8, sort="shareIdx", direction = Direction.DESC) Pageable pageable) {
		try {
			Map<String, Object> resultMap = new HashMap<String, Object>();
			
			Page<Share> shareList = shareService.getShareList(pageable);
			
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
			HttpServletRequest request,
			Share share, 
			@AuthenticationPrincipal String userId){
	      try {
	          
	          User user = new User();
	          user.setUserId(userId);
	          share.setUser(user);
	          int shareIdx = 0;
	          
	          // Share File List
	          List<ShareFile> shareFileList = new ArrayList<>();
	          
	          boolean isFirstFile = true;
	          
	          Iterator<String> i = multipartServletRequest.getFileNames();
	          while (i.hasNext()) {
	             List<MultipartFile> fileList = multipartServletRequest.getFiles(i.next());
	             for (MultipartFile file : fileList) {
	                if (!file.isEmpty()) {
	                   FileUtils fileUtils = new FileUtils();
	                   Map<String, String> fileInfo = fileUtils.parseFileInfo(request.getSession(), file, "share");

	                   if (isFirstFile) {
	                      share.setShareImgName(fileInfo.get("FileName"));
	                      isFirstFile = false;
	                   } else {
	                      ShareFile shareFile = new ShareFile();

	                      shareFile.setShare(share);
	                      shareFile.setShareFileName(fileInfo.get("FileName"));
	                      shareFile.setOriginalFileName(fileInfo.get("FileOrgName"));
	                      shareFileList.add(shareFile);
	                   }
	                }
	             }
	          }
	          
	          shareIdx = shareService.insertShare(share);
	          
	          System.out.println(shareFileList.size());
	          System.out.println(share.getShareIdx());
			
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
	public ResponseEntity<?> shareDetail(int shareIdx){
		try {
			Share share = shareService.shareDetail(shareIdx);
			
			return ResponseEntity.ok().body(share);
		} catch(Exception e) {
			ResponseDTO<Share> response = new ResponseDTO<>();
			response.setError(e.getMessage());
			return ResponseEntity.badRequest().body(response);
		}
	}
	
	//Share Reply List
	@GetMapping("/comment/{id}")
	
	public ResponseEntity<?> getShareReply(@PathVariable int id){
		System.out.println(id);
		try {
			List<ShareReply> shareReplyList = shareService.getShareReplyList(id);
			
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
			System.out.println(1);
			List<ShareReReply> shareReReplyList = shareService.getShareReReplyList(id, commentIdx);
			System.out.println(2);
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
	
	
	
	// DeleteShare
	
	// FileDown
	/** @RequestMapping("/fileDown")
	 * public ResponseEntity<Resource> fileDown(@RequestParam String fileName, HttpServletRequest request) {
	 * 		String path = request.getSession().getServletContext().getRealPath(path:"/") + "/upload/";
	 * 	
	 * 		Resource resource = new FileSystemResource(path + fileName);
	 * 
	 * 		String resourceName = resource.getFilename();
	 * 
	 * 		HttpHeaders header = new HttpHeaders();
	 * 
	 * 		try{
	 * 			header.add(headerName:"Content-Disposition", "attachment; filename=" + new String(resourceName.getBytes("UTF-8"),
					"ISO-8859-1"));
			} catch(Exception e) {
			e.printStackTrace();
			}
		
			return new ResponseEntity<Resource>(resource, header, HttpStatus.OK);
		}
	 *	
	 * 
	 * */
	
	
}
 