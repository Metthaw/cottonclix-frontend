// src/data/mockData.js

// ✅ 1. Import รูปภาพทั้งหมดที่ต้องใช้ในไฟล์นี้
import blogImg1 from '../img/Group 50.svg';
import blogImg2 from '../img/Group 51.svg';
import blogImg3 from '../img/Group 52.svg';
import collectionCover from '../img/Group 56.png';
import storyImg1 from '../img/10.png';
import storyImg2 from '../img/15.png';
import storyImg3 from '../img/2.png';
import storyImg4 from '../img/4.png';
import aboutHeroImage from '../img/Group 56.png';

// 2. ข้อมูลสำหรับ "ชั้นหนังสือ" (CatalogSlider)
export const collections = [
  {
    id: 'spring',
    name: 'Spring Collection',
    subtitle: 'Light fabrics and fresh designs.',
    coverImage: collectionCover, // ✅ ใช้ตัวแปรที่ import
  },
  {
    id: 'summer',
    name: 'Summer Collection',
    subtitle: 'Vibrant and full of life.',
    coverImage: collectionCover, // ✅ ใช้ตัวแปรที่ import
  },
  {
    id: 'autumn',
    name: 'Autumn Collection',
    subtitle: 'Warm tones and cozy textures.',
    coverImage: collectionCover, // ✅ ใช้ตัวแปรที่ import
  },
  {
    id: 'winter',
    name: 'Winter Collection',
    subtitle: 'Elegant and comfortable.',
    coverImage: collectionCover, // ✅ ใช้ตัวแปรที่ import
  },
];

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
    spring: {
      sliderImagePairs: [
        { id: 1, leftImg: storyImg1, rightImg: storyImg2 }, // ✅ ใช้ตัวแปรที่ import
        { id: 2, leftImg: storyImg3, rightImg: storyImg4 }, // ✅ ใช้ตัวแปรที่ import
      ],
      shopNowUrl: '#',
    },
    summer: {
      sliderImagePairs: [
        { id: 1, leftImg: storyImg1, rightImg: storyImg4 }, // ✅ ใช้ตัวแปรที่ import
      ],
      shopNowUrl: '#',
    },
    autumn: {
      sliderImagePairs: [
        { id: 1, leftImg: storyImg2, rightImg: storyImg3 }, // ✅ ใช้ตัวแปรที่ import
      ],
      shopNowUrl: '#',
    },
    winter: {
      sliderImagePairs: [
        { id: 1, leftImg: collectionCover, rightImg: storyImg1 }, // ✅ ใช้ตัวแปรที่ import
      ],
      shopNowUrl: '#',
    },
  },
};

// 4. ข้อมูลหน้า About Us
export const aboutPageData = {
  title: 'The Story of Cottonclix',
  featuredImageUrl: aboutHeroImage, // <-- จุดนี้จะใช้ตัวแปรที่ import มาโดยอัตโนมัติ
  content: [
    'Cottonclix ก่อตั้งขึ้นจากความหลงใหลในความงามของผ้าฝ้ายทอมือ ซึ่งเป็นมรดกทางวัฒนธรรมอันล้ำค่าของไทย เราเชื่อว่าทุกเส้นใยที่ถักทอล้วนมีเรื่องราวซ่อนอยู่ ตั้งแต่หยาดเหงื่อของเกษตรกรผู้ปลูกฝ้าย ไปจนถึงภูมิปัญญาของช่างทอผ้าที่สืบทอดกันมารุ่นสู่รุ่น',
    'แบรนด์ของเราจึงถือกำเนิดขึ้นเพื่อเป็นสะพานเชื่อมระหว่างผลงานหัตถกรรมอันทรงคุณค่ากับไลฟ์สไตล์ของคนเมืองยุคใหม่ เราคัดสรรผ้าฝ้ายคุณภาพดีจากชุมชนทั่วประเทศ นำมาออกแบบและตัดเย็บอย่างประณีต เพื่อสร้างสรรค์ผลิตภัณฑ์ที่ไม่เพียงแต่สวยงาม แต่ยังสวมใส่สบายและสะท้อนตัวตนของผู้ใช้งานได้เป็นอย่างดี',
    'เราหวังว่าเสื้อผ้าของ Cottonclix จะไม่ได้เป็นเพียงเครื่องนุ่งห่ม แต่เป็นส่วนหนึ่งในการบอกเล่าเรื่องราวและสืบสานวัฒนธรรมการทอผ้าของไทยให้คงอยู่สืบไป'
  ]
};

// 5. ข้อมูลหน้า Blog
export const blogPosts = [ // ✅ แก้ไขจาก port เป็น export
  {
    id: 1,
    category: 'HANDCRAFT',
    title: 'เสน่ห์ผ้าทอมือ: จากเส้นใยสู่ผืนผ้าแห่งเรื่องราว',
    excerpt: 'ค้นพบเรื่องราวเบื้องหลังผ้าฝ้ายทอมือแต่ละผืน ความประณีต และจิตวิญญาณของช่างทอที่สืบทอดจากรุ่นสู่รุ่น...',
    imageUrl: blogImg1,
    author: 'Cottonclix Team',
    date: 'July 10, 2025',
  },
  {
    id: 2,
    category: 'SUSTAINABILITY',
    title: 'แฟชั่นยั่งยืน: ทำไมเสื้อผ้าจากเส้นใยธรรมชาติจึงดีกว่า?',
    excerpt: 'ในยุคที่โลกต้องการความยั่งยืน การเลือกใช้เสื้อผ้าจากเส้นใยธรรมชาติไม่ได้เป็นเพียงแค่เทรนด์ แต่เป็นการแสดงความรับผิดชอบต่อโลก',
    imageUrl: blogImg2,
    author: 'Cottonclix Team',
    date: 'July 05, 2025',
  },
  {
    id: 3,
    category: 'TIPS & TRICKS',
    title: 'เคล็ดลับการดูแลผ้าฝ้ายทอมือให้สวยงามยาวนาน',
    excerpt: 'ผ้าฝ้ายทอมือต้องการการดูแลที่พิเศษกว่าผ้าทั่วไปเล็กน้อย มาดูเคล็ดลับง่ายๆ ที่จะช่วยยืดอายุการใช้งานให้เสื้อผ้าตัวโปรดของคุณ',
    imageUrl: blogImg3,
    author: 'Cottonclix Team',
    date: 'June 28, 2025',
  },
];