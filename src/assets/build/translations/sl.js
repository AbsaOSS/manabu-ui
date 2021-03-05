/*
 * Copyright 2020 ABSA Group Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(function(d){	const l = d['sl'] = d['sl'] || {};	l.dictionary=Object.assign(		l.dictionary||{},		{"%0 of %1":"","Block quote":"Blokiraj citat",Bold:"Krepko",Cancel:"Prekliči","Cannot upload file:":"Ni možno naložiti datoteke:","Choose heading":"Izberi naslov",Code:"Koda","Could not insert image at the current position.":"Slike ni mogoče vstaviti na trenutni položaj.","Could not obtain resized image URL.":"Ne morem pridobiti spremenjenega URL-ja slike.","Dropdown toolbar":"","Editor toolbar":"",Heading:"Naslov","Heading 1":"Naslov 1","Heading 2":"Naslov 2","Heading 3":"","Heading 4":"","Heading 5":"","Heading 6":"","Insert image or file":"Vstavi sliko ali datoteko","Inserting image failed":"Vstavljanje slike ni uspelo",Italic:"Poševno",Next:"",Paragraph:"Odstavek",Previous:"","Rich Text Editor":"","Rich Text Editor, %0":"",Save:"Shrani","Selecting resized image failed":"Izbira spremenjene slike ni uspela","Show more items":""}	);l.getPluralForm=function(n){return (n%100==1 ? 0 : n%100==2 ? 1 : n%100==3 || n%100==4 ? 2 : 3);;};})(window.CKEDITOR_TRANSLATIONS||(window.CKEDITOR_TRANSLATIONS={}));