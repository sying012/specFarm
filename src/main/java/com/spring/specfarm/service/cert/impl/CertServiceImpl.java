package com.spring.specfarm.service.cert.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.persistence.Column;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.specfarm.entity.Cert;
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
}
