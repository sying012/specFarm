package com.spring.specfarm.api;

import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

public class Api {
	public static String getTagValue(String tag, Element element) {
		NodeList nList = null;
		Node node = null;
		
		try {
			nList = element.getElementsByTagName(tag).item(0).getChildNodes();
			node = (Node) nList.item(0);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		if(node == null)
			return null;
		
		return node.getNodeValue();
	}
}
