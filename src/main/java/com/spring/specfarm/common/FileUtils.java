package com.spring.specfarm.common;

//실제 서버에 파일 업로드 처리를 해주는 클래스
//박지은 커밋 테스트
public class FileUtils {
	/*
	 * public List<ItemFile> parseFileInfo(int itemNo, HttpServletRequest request,
	 * MultipartHttpServletRequest multipartServletRequest) throws IOException {
	 * List<ItemFile> fileList = new ArrayList<ItemFile>();
	 * 
	 * //서버의 루트 경로 가져오기 String rootPath =
	 * request.getServletContext().getRealPath("/");
	 * 
	 * String attachPath = "/upload/";
	 * 
	 * File directory = new File(rootPath + attachPath);
	 * 
	 * if(directory.exists() == false) { //서버 루트 경로에 upload 폴더 만들기
	 * directory.mkdir(); }
	 * 
	 * //첨부파일 목록 꺼내오기 Iterator<String> iterator =
	 * multipartServletRequest.getFileNames();
	 * 
	 * while(iterator.hasNext()) { //iterator에 담겨있는 파일이름들로 첨부파일 꺼내오기
	 * List<MultipartFile> list = multipartServletRequest.getFiles(iterator.next());
	 * 
	 * for(MultipartFile multipartFile : list) { if(!multipartFile.isEmpty()) {
	 * ItemFile itemFile = new ItemFile(); Item item = new Item();
	 * 
	 * item.setItemNo(itemNo);
	 * 
	 * itemFile.setItem(item); //화면에 표출할 때 사용
	 * itemFile.setItemfileOrgNm(multipartFile.getOriginalFilename());
	 * 
	 * //고유한 파일명 생성 //실제 서버에 저장되는 파일명 String uuid = UUID.randomUUID().toString();
	 * itemFile.setItemfileNm(uuid + multipartFile.getOriginalFilename());
	 * 
	 * itemFile.setItemfilePath(rootPath + attachPath);
	 * 
	 * fileList.add(itemFile);
	 * 
	 * //파일 업로드 처리 File file = new File(rootPath + attachPath + uuid +
	 * multipartFile.getOriginalFilename());
	 * 
	 * multipartFile.transferTo(file); } } }
	 * 
	 * return fileList;  }
	 */
}
