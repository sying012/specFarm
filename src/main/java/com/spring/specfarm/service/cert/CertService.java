package com.spring.specfarm.service.cert;

import java.util.List;
import java.util.Map;

public interface CertService {
	//api 정보 db 저장
	void setCertficationList(List<Map<String, Object>> list);
	
	//종목코드 리스트 조회
	List<String> getJmcdList();	
}
