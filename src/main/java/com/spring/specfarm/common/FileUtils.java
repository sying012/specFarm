package com.spring.specfarm.common;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpSession;

import org.springframework.web.multipart.MultipartFile;

//실제 서버에 파일 업로드 처리를 해주는 클래스
public class FileUtils {
	public Map<String,String> parseFileInfo(HttpSession session, MultipartFile files, String dir) throws IOException {
	
		
		//서버의 루트 경로 가져오기
		String rootPath = session.getServletContext().getRealPath("/");
		
		String attachPath = "../frontend/public/upload/" + dir + "/";
		
		File directory = new File(rootPath + attachPath);
		
		System.out.println(rootPath + attachPath);
		
		if(directory.exists() == false) {
			//서버 루트 경로에 upload 폴더 만들기
			directory.mkdir();
		}

		
		//고유한 파일명 생성
		//실제 서버에 저장되는 파일명
		String uuid = UUID.randomUUID().toString();
	
		
		//파일 업로드 처리
		System.out.println(1);
		File file = new File(rootPath + attachPath + uuid + files.getOriginalFilename());
		System.out.println(2);
		files.transferTo(file);
		System.out.println(3);
	
		Map<String, String> rm = new HashMap<String, String>();
		rm.put("FileName", uuid + files.getOriginalFilename());
		rm.put("FileOrgName", files.getOriginalFilename());
		return rm;
	}
}
