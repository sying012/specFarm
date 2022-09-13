package com.spring.specfarm.service.notice;

import java.util.List;

import com.spring.specfarm.entity.Brch;
import com.spring.specfarm.entity.Lost;

public interface NoticeService {

	void saveBrch(List<Brch> brchList);

	List<Brch> getBrch();

	void saveLosts(List<Lost> lostList);

	List<Lost> getLosts();

}
