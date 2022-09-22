package com.spring.specfarm.service.cert.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.specfarm.entity.Cert;
import com.spring.specfarm.entity.CertContents;
import com.spring.specfarm.entity.CertTest;
import com.spring.specfarm.mapper.CertMapper;
import com.spring.specfarm.repository.CertContentsRepository;
import com.spring.specfarm.repository.CertRepository;
import com.spring.specfarm.repository.CertTestRepository;
import com.spring.specfarm.service.cert.CertService;

@Service
public class CertServiceImpl implements CertService {

	@Autowired
	CertRepository certRepository;

	@Autowired
	private CertTestRepository certTestRepository;

	@Autowired
	private CertContentsRepository certContentsRepository;
	
	@Autowired
	private CertMapper certMapper;

	@Override
	public void setCertficationList(List<Map<String, Object>> list) {
		for (int i = 0; i < list.size(); i++) {
			Cert cert = new Cert();
			int certIdx = certRepository.getNextCertIndex();

			cert.setCertIdx(certIdx);
			cert.setObligfldcd(list.get(i).get("obligfldcd").toString());
			cert.setObligfldnm(list.get(i).get("obligfldnm").toString());
			cert.setMdobligfldcd(list.get(i).get("mdobligfldcd").toString());
			cert.setMdobligfldnm(list.get(i).get("mdobligfldnm").toString());
			cert.setJmcd(list.get(i).get("jmcd").toString());
			cert.setJmfldnm(list.get(i).get("jmfldnm").toString());

			 //certRepository.save(cert);

		}
	}

	@Override
	public List<String> getJmcdList() {
		return certTestRepository.getJmcdList();
		
	}

	@Override
	public void setCertTestList(List<Map<String, Object>> list) {

		for (int i = 0; i < list.size(); i++) {
			// System.out.println( list.size());
			CertTest certtest = new CertTest();
			int certTestIdx = certTestRepository.getNextCertTestIndex();

			certtest.setCertTestIdx(certTestIdx);
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
			certtest.setJmfldnm(list.get(i).get("jmfldnm").toString());
			 //certTestRepository.save(certtest);
		}
	}


	public void setCertContents(List<Map<String, Object>> list) {
		// System.out.println("////////////////////////////////////////////////"+list.size());

		for (int i = 0; i < list.size(); i++) {
			CertContents certcontents = new CertContents();
			int certContentsIdx = certContentsRepository.getNextCertContentsIndex();

			certcontents.setCertContentsIdx(certContentsIdx);
			certcontents.setContents(list.get(i).get("contents").toString());

			 certContentsRepository.save(certcontents);

		}
	}

	

	@Override
	public List<Map<String, Object>> getCertLList() {
		System.out.println("11111111111111111" + "getCertList");
		return certMapper.getCertLList();
	}
	
	
	@Override
	public List<Map<String, Object>> getCertMList(String obligfldnm) {
		return certMapper.getCertMList(obligfldnm);
	}
	
	@Override
	public List<Map<String, Object>> getCertSList(String mdobligfldnm) {
		return certMapper.getCertSList(mdobligfldnm);
	}
}
