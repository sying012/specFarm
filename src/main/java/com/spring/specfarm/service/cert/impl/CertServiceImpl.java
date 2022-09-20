package com.spring.specfarm.service.cert.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.specfarm.entity.Cert;
import com.spring.specfarm.entity.CertTest;
import com.spring.specfarm.repository.CertRepository;
import com.spring.specfarm.service.cert.CertService;


@Service
public class CertServiceImpl implements CertService{
	
	@Autowired
	CertRepository certRepository;
	
	@Override
	public void setCertficationList(List<Map<String, Object>> list) {
		for(int i = 0; i < list.size(); i++) {
			Cert cert = new Cert();
			int certIdx = certRepository.getNextCertIndex();
			
			cert.setCertIdx(certIdx);
			cert.setObligfldcd(list.get(i).get("obligfldcd").toString());
			cert.setSeriescd(list.get(i).get("seriescd").toString());
			cert.setJmcd(list.get(i).get("jmcd").toString());
			cert.setMdobligfldnm(list.get(i).get("mdobligfldnm").toString());
			cert.setMdobligfldcd(list.get(i).get("mdobligfldcd").toString());
			cert.setObligfldnm(list.get(i).get("obligfldnm").toString());
			cert.setQualgbcd(list.get(i).get("qualgbcd").toString());
			cert.setSeriesnm(list.get(i).get("seriesnm").toString());
			cert.setCertName(list.get(i).get("CertName").toString());
			cert.setQualgbnm(list.get(i).get("qualgbnm").toString());
			
			//certRepository.save(cert);
		}
	}

	@Override
	public List<String> getJmcdList() {
		return certRepository.getJmcdList();
	}

	@Override
	public void setCertTestList(List<Map<String, Object>> list) {
		for(int i = 0; i < list.size(); i++) {
			CertTest certtest = new CertTest();
			int certtestIdx = certRepository.getNextCertTestIndex();
			
			certtest.setCertTestIdx(certtestIdx);
			certtest.setImplplannm(list.get(i).get("implplannm").toString());
			certtest.setDocregstartdt(list.get(i).get("docregstartdt").toString());
			certtest.setDocregenddt(list.get(i).get("docregenddt").toString());
			certtest.setDocexamstartdt(list.get(i).get("docexamstartdt").toString());
			certtest.setDocpassdt(list.get(i).get("docpassdt").toString());
			certtest.setPracregstartdt(list.get(i).get("pracregstartdt").toString());
			certtest.setPracregenddt(list.get(i).get("pracregenddt").toString());
			certtest.setPracexamstartdt(list.get(i).get("pracexamstartdt").toString());
			certtest.setPracexamenddt(list.get(i).get("pracexamenddt").toString());
			certtest.setPracpassstartdt(list.get(i).get("pracpassstartdt").toString());
	}
    	}

//	@Override
//	public List<Map<String, Object>> getCertList() {
//		List<Map<String, Object>> list = certMapper.findLost();
//		return list;
//	}
}
