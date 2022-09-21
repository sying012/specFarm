package com.spring.specfarm.common;

import java.util.HashMap;
import java.util.Iterator;

import org.json.JSONObject;
import org.json.XML;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

public class CommUtils {
   
   
   public String xmlToJson(String str) {

     try{
       String xml = str;
       JSONObject jObject = XML.toJSONObject(xml);       
       ObjectMapper mapper = new ObjectMapper();
       mapper.enable(SerializationFeature.INDENT_OUTPUT);
       Object json = mapper.readValue(jObject.toString(), Object.class);
       String output = mapper.writeValueAsString(json);
       //System.out.println(output);
       
       return output;
     }catch (Exception e) {
       e.printStackTrace();
       return null;
     }
   }
   
   public HashMap<String, JSONObject> paramMap(String str) {
      HashMap<String, JSONObject> hashMap = new HashMap<String, JSONObject>();
      JSONObject json = new JSONObject(str);
      
      Iterator i = json.keys();
      
      while(i.hasNext()) {
         String k = i.next().toString();
         hashMap.put(k, json.getJSONObject(k));
      }
      return hashMap;
   }
}