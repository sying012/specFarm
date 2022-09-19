package com.spring.specfarm.controller.community;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.spring.specfarm.entity.Share;
import com.spring.specfarm.entity.ShareFile;
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
		} catch(Exception e) {
			Map<String, Object> errorMap = new HashMap<String, Object>();
			errorMap.put("error", e.getMessage());
			return errorMap;
		}
	}

	//Share 리스트 반환
	@GetMapping("")
	public Map<String, Object> getShare(@PageableDefault(page = 0, size = 8, sort="shareIdx") Pageable pageable) {
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
	
	//share 글등록
	@PostMapping("/newShare") 
	public Map<String, Object> insertShare(MultipartHttpServletRequest multipartServletRequest, 
			HttpServletRequest request,
			Share share, 
			@AuthenticationPrincipal String userId){
		try {
			System.out.println(share.toString());
			
			User user = new User();
			user.setUserId(userId);
			share.setUser(user);
			int shareIdx = 0;
			
			Iterator<String> i = multipartServletRequest.getFileNames();
			
			List<ShareFile> shareFileList = new ArrayList<ShareFile>();
			
			String rootPath = request.getSession().getServletContext().getRealPath("/");
			
			String attachPath = "/upload";
			
			File directory = new File(rootPath + attachPath);
			
			if(!directory.exists()) {
				directory.mkdir();
			}

			boolean isFirstFile = true;
			
			while(i.hasNext()) {
				List<MultipartFile> fileList = multipartServletRequest.getFiles(i.next());
				for(MultipartFile f : fileList) {
					if(!f.isEmpty()) {
						String uuid = UUID.randomUUID().toString();
						
						if(isFirstFile) {
							share.setShareImgName(uuid + f.getOriginalFilename());
							shareIdx = shareService.insertShare(share);
							isFirstFile = false;
						} else {
							ShareFile shareFile = new ShareFile();
							
							shareFile.setShare(share);
							shareFile.setShareFileName(uuid + f.getOriginalFilename());
							
							shareFileList.add(shareFile);
						}
						
						File file = new File(rootPath + attachPath + uuid + f.getOriginalFilename());
						f.transferTo(file);
					}
				}
			}
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
	
	
	
	
	
	
	
}
 