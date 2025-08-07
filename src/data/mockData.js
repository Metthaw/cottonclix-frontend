// src/data/mockData.js

// ✅ 1. Import รูปภาพทั้งหมดที่ต้องใช้ในไฟล์นี้

import collectionCover from '../img/Group 56.png';
import storyImg1 from '../img/10.png';
import storyImg2 from '../img/15.png';
import storyImg3 from '../img/2.png';
import storyImg4 from '../img/4.png';
import aboutHeroImage from '../img/Group 56.png';
import contentImg1 from '../img/Group 8.svg';

import blogCover1 from '../img/10.png';
import blogCover2 from '../img/15.png';
import blogCover3 from '../img/4.png';

// 2. ข้อมูลสำหรับ "ชั้นหนังสือ" (CatalogSlider)

// 3. ข้อมูลสำหรับ "StoryBook" (เนื้อหาในหนังสือ)
export const storyContent = {
  storyText: {
    heading: 'Once upon a time...',
    paragraphs: [
      `there was a tiny flower named Cutter.
It wasn’t flashy, and it had no strong scent.
But it always smiled—
and stayed quietly beside other flowers.

“I may not be the star,” thought Cutter,
“but I’m happy just being here,
making others feel a little more complete.”

One day, a soft breeze passed through the field.
Someone walked by… and paused to look.
He smiled and picked Cutter,
gently placing it in a bouquet.

“This flower is so simple,” he said,
“but it’s the sweetest of all.”

Cutter smiled again.
Because finally…
it became a gift full of meaning
to someone special. 💛`
    ],
  },
    collectionDetails: {
    'spring-collection': { // จาก 'spring' เป็น 'spring-collection'
      sliderImagePairs: [
        { id: 's1', leftImg: storyImg1, rightImg: storyImg2 },
        { id: 's2', leftImg: storyImg3, rightImg: storyImg4 },
      ],
    },
    'summer-collection': { // จาก 'summer' เป็น 'summer-collection'
      sliderImagePairs: [
        { id: 'su1', leftImg: storyImg4, rightImg: blogCover1 },
        { id: 'su2', leftImg: storyImg2, rightImg: storyImg3 },
      ],
    },
    'autumn-collection': { // จาก 'autumn' เป็น 'autumn-collection'
      sliderImagePairs: [
        { id: 'a1', leftImg: collectionCover, rightImg: storyImg1 },
        { id: 'a2', leftImg: blogCover2, rightImg: storyImg4 },
      ],
    },
    'winter-collection': { // จาก 'winter' เป็น 'winter-collection'
      sliderImagePairs: [
        { id: 'w1', leftImg: blogCover3, rightImg: aboutHeroImage },
        { id: 'w2', leftImg: storyImg1, rightImg: storyImg3 },
      ],
    },
  },
};

// 4. ข้อมูลหน้า About Us
// export const aboutPageData = {
//   title: 'The Story of Cottonclix',
//   featuredImageUrl: aboutHeroImage, // <-- จุดนี้จะใช้ตัวแปรที่ import มาโดยอัตโนมัติ
//   content: [
//     'Cottonclix ก่อตั้งขึ้นจากความหลงใหลในความงามของผ้าฝ้ายทอมือ ซึ่งเป็นมรดกทางวัฒนธรรมอันล้ำค่าของไทย เราเชื่อว่าทุกเส้นใยที่ถักทอล้วนมีเรื่องราวซ่อนอยู่ ตั้งแต่หยาดเหงื่อของเกษตรกรผู้ปลูกฝ้าย ไปจนถึงภูมิปัญญาของช่างทอผ้าที่สืบทอดกันมารุ่นสู่รุ่น',
//     'แบรนด์ของเราจึงถือกำเนิดขึ้นเพื่อเป็นสะพานเชื่อมระหว่างผลงานหัตถกรรมอันทรงคุณค่ากับไลฟ์สไตล์ของคนเมืองยุคใหม่ เราคัดสรรผ้าฝ้ายคุณภาพดีจากชุมชนทั่วประเทศ นำมาออกแบบและตัดเย็บอย่างประณีต เพื่อสร้างสรรค์ผลิตภัณฑ์ที่ไม่เพียงแต่สวยงาม แต่ยังสวมใส่สบายและสะท้อนตัวตนของผู้ใช้งานได้เป็นอย่างดี',
//     'เราหวังว่าเสื้อผ้าของ Cottonclix จะไม่ได้เป็นเพียงเครื่องนุ่งห่ม แต่เป็นส่วนหนึ่งในการบอกเล่าเรื่องราวและสืบสานวัฒนธรรมการทอผ้าของไทยให้คงอยู่สืบไป'
//   ]
// };

// 5. ข้อมูลหน้า Blog
// export const blogPosts = [
//   {
//     id: 1,
//     category: 'HANDCRAFT',
//     title: 'เสน่ห์ผ้าทอมือ: จากเส้นใยสู่ผืนผ้าแห่งเรื่องราว',
//     excerpt: 'ค้นพบเรื่องราวเบื้องหลังผ้าฝ้ายทอมือแต่ละผืน...',
//     imageUrl: blogCover1,
//     author: 'Cottonclix Team',
//     date: 'July 10, 2025',
//     content: [
//       { type: 'paragraph', text: 'ในโลกที่หมุนไปอย่างรวดเร็ว ของขวัญเล็กๆ ที่ทำด้วยความใส่ใจมักมีความหมายมากกว่าที่เราคิด และนั่นคือแรงบันดาลใจเบื้องหลัง Cottonclix' },
//       { type: 'paragraph', text: 'Cottonclix ถือกำเนิดขึ้นจากความหลงใหลในผ้าและความเชื่อที่ว่า "ของขวัญที่ดีไม่จำเป็นต้องยิ่งใหญ่ แต่ต้องมีความหมาย" เราใช้ผ้าฝ้ายคุณภาพสูงผสมผสานกับลวดลายที่อบอุ่นและเรียบง่าย เพื่อสร้างสรรค์ของขวัญชิ้นเล็กๆ แต่พรีเมียม ไม่ว่าจะเป็นยางรัดผม กระเป๋าใบเล็ก หรือของที่ระลึกเล็กๆ น้อยๆ' },
//       { type: 'image', url: contentImg1, alt: 'A handmade pouch' },
//       { type: 'paragraph', text: 'สิ่งที่เราภูมิใจไม่ใช่แค่ "สิ่งของ" ที่คุณได้รับ แต่เป็น "ความรู้สึก" ที่มาพร้อมกับมัน ความอบอุ่นที่ทำด้วยมือ การห่อของขวัญด้วยความตั้งใจ และการดูแลในทุกฝีเข็ม' },
//     ]
//   },
//   {
//     id: 2,
//     category: 'SUSTAINABILITY',
//     title: 'แฟชั่นยั่งยืน: ทำไมเสื้อผ้าจากเส้นใยธรรมชาติจึงดีกว่า?',
//     excerpt: 'การเลือกใช้เสื้อผ้าจากเส้นใยธรรมชาติไม่ใช่แค่เทรนด์...',
//     imageUrl: blogCover2,
//     author: 'Cottonclix Team',
//     date: 'July 05, 2025',
//     content: [
//       { type: 'paragraph', text: 'ความยั่งยืนเป็นหัวใจสำคัญของแบรนด์เรา การเลือกใช้ผ้าฝ้ายซึ่งเป็นเส้นใยจากธรรมชาติไม่เพียงแต่ดีต่อผู้สวมใส่ แต่ยังดีต่อโลกของเราอีกด้วย' },
//       { type: 'paragraph', text: 'เสื้อผ้าจากเส้นใยธรรมชาติสามารถย่อยสลายได้ตามชีวภาพ ลดปัญหาสิ่งแวดล้อมที่เกิดจากไมโครพลาสติกที่มาจากใยสังเคราะห์ นอกจากนี้ เรายังสนับสนุนเกษตรกรและช่างทอในชุมชน สร้างเศรษฐกิจหมุนเวียนที่เกื้อกูลกัน' },
//     ]
//   },
//   {
//     id: 3,
//     category: 'TIPS & TRICKS',
//     title: 'เคล็ดลับการดูแลผ้าฝ้ายทอมือให้สวยงามยาวนาน',
//     excerpt: 'ผ้าฝ้ายทอมือต้องการการดูแลที่พิเศษกว่าผ้าทั่วไป...',
//     imageUrl: blogCover3,
//     author: 'Cottonclix Team',
//     date: 'June 28, 2025',
//     content: [
//       { type: 'paragraph', text: 'เพื่อให้เสื้อผ้าชิ้นโปรดของคุณคงความสวยงามไปนานๆ ควรซักด้วยมือในน้ำอุณหภูมิปกติและใช้น้ำยาซักผ้าชนิดอ่อนโยน หลีกเลี่ยงการใช้สารฟอกขาวและการบิดผ้าแรงๆ' },
//       { type: 'paragraph', text: 'ควรตากในที่ร่มที่มีลมโกรก เพื่อป้องกันสีซีดจางจากแสงแดดโดยตรง การรีดควรรีดในขณะที่ผ้ายังมีความชื้นเล็กน้อยโดยใช้ไฟอ่อน จะช่วยให้ผ้าเรียบง่ายและถนอมเส้นใยได้ดีที่สุด' },
//     ]
//   },
//   {
//     id: 4,
//     category: 'INSPIRATION',
//     title: 'แรงบันดาลใจจากสีสันของธรรมชาติในแต่ละฤดู',
//     excerpt: 'สำรวจการใช้สีที่ได้แรงบันดาลใจจากธรรมชาติ...',
//     imageUrl: blogCover1,
//     author: 'Cottonclix Team',
//     date: 'June 20, 2025',
//     content: [
//       { type: 'paragraph', text: 'คอลเลกชันของเราได้แรงบันดาลใจจากสีสันรอบตัว ไม่ว่าจะเป็นสีเอิร์ธโทนของผืนดิน สีเขียวของใบไม้ หรือสีฟ้าอ่อนของท้องฟ้า เราเชื่อว่าสีจากธรรมชาติให้ความรู้สึกสบายตาและสงบใจ' },
//       { type: 'image', url: collectionCover, alt: 'Natural color palette' },
//       { type: 'paragraph', text: 'การนำสีสันเหล่านี้มาใช้ในการออกแบบ ทำให้ผลิตภัณฑ์ของเราไม่เพียงแต่สวยงาม แต่ยังเชื่อมโยงผู้ใช้งานเข้ากับธรรมชาติได้อย่างลงตัว' },
//     ]
//   },
//   {
//     id: 5,
//     category: 'BEHIND THE SCENES',
//     title: 'เบื้องหลังการทำงานของช่างทอผ้าในชุมชน',
//     excerpt: 'พูดคุยกับช่างทอผ้าผู้สร้างสรรค์ผลงานอันงดงาม...',
//     imageUrl: blogCover2,
//     author: 'Cottonclix Team',
//     date: 'June 15, 2025',
//     content: [
//       { type: 'paragraph', text: 'ทุกผลิตภัณฑ์ของ Cottonclix เกิดขึ้นจากความตั้งใจและฝีมือของช่างทอในชุมชนต่างๆ ทั่วประเทศ เราได้เข้าไปพูดคุยและเรียนรู้กระบวนการทำงานที่สืบทอดกันมาหลายชั่วอายุคน' },
//       { type: 'paragraph', text: 'การสนับสนุนของเราไม่เพียงสร้างรายได้ แต่ยังช่วยอนุรักษ์ภูมิปัญญาท้องถิ่นให้คงอยู่ต่อไป ทุกการซื้อของคุณคือส่วนหนึ่งของการสืบสานวัฒนธรรมอันล้ำค่านี้' },
//     ]
//   },
//   {
//     id: 6,
//     category: 'STYLE GUIDE',
//     title: 'จับคู่เสื้อผ้าผ้าฝ้ายกับเครื่องประดับชิ้นโปรด',
//     excerpt: 'ไอเดียการมิกซ์แอนด์แมทช์เสื้อผ้าฝ้ายให้ดูดีมีสไตล์...',
//     imageUrl: blogCover3,
//     author: 'Cottonclix Team',
//     date: 'June 10, 2025',
//     content: [
//       { type: 'paragraph', text: 'เสื้อผ้าจากผ้าฝ้ายมีความเรียบง่ายและเป็นธรรมชาติในตัว ทำให้สามารถจับคู่กับเครื่องประดับได้หลากหลาย ลองเลือกสร้อยคอเงินเส้นเล็กๆ หรือต่างหูจากวัสดุธรรมชาติเพื่อเสริมลุคให้ดูสมบูรณ์' },
//       { type: 'paragraph', text: 'สำหรับวันสบายๆ ยางรัดผมผ้าฝ้ายของเราก็เป็นแอคเซสเซอรี่ที่น่ารักและเข้ากันได้ดีกับทุกลุค หรือจะเลือกกระเป๋าผ้า Tote Bag สักใบ ก็พร้อมสำหรับทุกกิจกรรม' },
//     ]
//   },
// ];