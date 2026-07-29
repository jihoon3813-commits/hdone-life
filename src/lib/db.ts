import fs from "fs";
import path from "path";

const dbFilePath = path.join(process.cwd(), "hdone_life_db.json");

interface DBStructure {
  site_config: Array<{
    id: number;
    site_name: string;
    company_kr_name: string;
    phone: string;
    email: string;
    address: string;
    business_number: string;
    ceo_name: string;
    privacy_officer: string;
    hours: string;
    map_lat: number;
    map_lng: number;
    updated_at: string;
  }>;
  main_slides: Array<{
    id: number;
    title: string;
    subtitle: string;
    bg_image: string;
    link_url: string;
    is_active: number;
    display_order: number;
    created_at: string;
  }>;
  notices: Array<{
    id: number;
    title: string;
    content: string;
    author: string;
    views: number;
    is_important: number;
    attachment_name: string | null;
    attachment_url: string | null;
    created_at: string;
    updated_at: string;
  }>;
  qnas: Array<{
    id: number;
    title: string;
    content: string;
    author: string;
    password?: string | null;
    views: number;
    is_secret: number;
    is_answered: number;
    answer: string | null;
    answer_at: string | null;
    created_at: string;
  }>;
  galleries: Array<{
    id: number;
    title: string;
    content: string;
    author: string;
    views: number;
    main_image: string;
    images_json: string;
    created_at: string;
  }>;
  inquiries: Array<{
    id: number;
    name: string;
    phone: string;
    email: string | null;
    type: string;
    interest_product: string | null;
    title: string;
    content: string;
    attachment_url: string | null;
    is_agreed: number;
    status: string;
    admin_note: string | null;
    created_at: string;
  }>;
  users: Array<{
    id: number;
    email: string;
    password: string;
    name: string;
    phone: string;
    role: string;
    created_at: string;
  }>;
  popups: Array<{
    id: number;
    title: string;
    content_html: string | null;
    image_url: string | null;
    link_url: string | null;
    width: number;
    height: number;
    top_pos: number;
    left_pos: number;
    is_active: number;
    created_at: string;
  }>;
}

const defaultData: DBStructure = {
  site_config: [
    {
      id: 1,
      site_name: "HDONE LIFE",
      company_kr_name: "(주)에이치디원",
      phone: "1544-8826",
      email: "contact@hdone-life.co.kr",
      address: "서울시 중랑구 동일로 964, 4층 4061호(묵동, 에릭슨시스템)",
      business_number: "149-86-03849",
      ceo_name: "박혜경",
      privacy_officer: "박혜경",
      hours: "평일 09:00 - 18:00",
      map_lat: 37.6108,
      map_lng: 127.0772,
      updated_at: new Date().toISOString(),
    },
  ],
  main_slides: [
    {
      id: 1,
      title: "HDONE LIFE 장례서비스",
      subtitle: "저희 HDONE LIFE는 가족처럼 모시는 정성스러운 기업입니다.\n삶의 소중한 순간, 항상 힘이 되는 파트너가 되겠습니다.",
      bg_image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1600&q=80",
      link_url: "/service/funeral",
      is_active: 1,
      display_order: 1,
      created_at: new Date().toISOString(),
    },
    {
      id: 2,
      title: "HDONE LIFE 웨딩서비스",
      subtitle: "생애 최고의 서비스를 모든 패키지 상품에 담아\n영원한 추억과 행복을 함께하는 웨딩의 모든 것을 준비해 드립니다.",
      bg_image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80",
      link_url: "/service/wedding",
      is_active: 1,
      display_order: 2,
      created_at: new Date().toISOString(),
    },
    {
      id: 3,
      title: "HDONE LIFE 크루즈여행",
      subtitle: "낭만과 꿈의 크루즈 여행을 통해 다양한 공연과 이벤트로\n모든 관광을 고품격으로 누릴 수 있는 멋진 여행을 느껴보세요.",
      bg_image: "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=1600&q=80",
      link_url: "/service/cruise",
      is_active: 1,
      display_order: 3,
      created_at: new Date().toISOString(),
    },
    {
      id: 4,
      title: "HDONE LIFE 펫장례",
      subtitle: "평생 같이한 반려동물을 떠나보내는 펫장례의 모든 과정을\n가족과 같은 정성과 사랑으로 엄수해 드리겠습니다.",
      bg_image: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=1600&q=80",
      link_url: "/service/pet-funeral",
      is_active: 1,
      display_order: 4,
      created_at: new Date().toISOString(),
    },
  ],
  notices: [
    {
      id: 1,
      title: "HDONE LIFE 장례서비스 프리미엄 상품 출시 안내",
      content: "안녕하세요. HDONE LIFE입니다.\n\n고객님들의 끊임없는 성원에 힘입어 보다 품격 높은 396만원 프리미엄 장례 서비스를 선보이게 되었습니다.\n\n최상의 예우와 정성으로 모시겠습니다. 자세한 내용은 서비스 안내 페이지를 참고해 주시기 바랍니다.",
      author: "관리자",
      views: 142,
      is_important: 1,
      attachment_name: null,
      attachment_url: null,
      created_at: "2026-07-28 09:00:00",
      updated_at: "2026-07-28 09:00:00",
    },
    {
      id: 2,
      title: "HDONE LIFE 회원 혜택 및 동남아 크루즈 할인 이벤트",
      content: "HDONE LIFE 회원을 위한 특별 할인이 적용되는 동남아 크루즈 여행 상품이 오픈되었습니다.\n총 여행 금액에서 회원 전용 20만원 할인 혜택이 적용됩니다.",
      author: "관리자",
      views: 89,
      is_important: 0,
      attachment_name: null,
      attachment_url: null,
      created_at: "2026-07-27 14:00:00",
      updated_at: "2026-07-27 14:00:00",
    },
    {
      id: 3,
      title: "HDONE LIFE 공식 웹사이트 신규 오픈 안내",
      content: "HDONE LIFE 공식 웹사이트가 새롭게 개편되었습니다.\n\n언제 어디서나 장례, 웨딩, 크루즈, 펫장례 서비스를 쉽고 빠르게 확인하시고 1:1 상담을 신청하실 수 있습니다.",
      author: "관리자",
      views: 210,
      is_important: 0,
      attachment_name: null,
      attachment_url: null,
      created_at: "2026-07-26 10:00:00",
      updated_at: "2026-07-26 10:00:00",
    },
  ],
  qnas: [
    {
      id: 1,
      title: "상례 상담은 언제 언제 가능한가요?",
      content: "급하게 긴급 장례 발생 시 몇 시까지 연락이 가능한가요?",
      author: "김*철",
      password: "1234",
      views: 45,
      is_secret: 0,
      is_answered: 1,
      answer: "안녕하세요 HDONE LIFE입니다. 당사의 24시간 장례 종합상황실은 365일 연중무휴 24시간 운영됩니다. 언제든지 대표전화(1544-8826)로 연락 주시면 즉시 앰블런스 이송 및 의전지도사가 출동합니다.",
      answer_at: "2026-07-28 10:00:00",
      created_at: "2026-07-28 09:30:00",
    },
    {
      id: 2,
      title: "펫장례 서비스 구체적인 절차 질문드립니다.",
      content: "반려견 장례 시 운구 서비스도 포함되어 있는지 궁금합니다.",
      author: "이*진",
      password: "1234",
      views: 32,
      is_secret: 0,
      is_answered: 1,
      answer: "네, HDONE LIFE 펫장례 서비스에는 차량 운구부터 염습, 추모, 화장, 봉안까지 전 과정에 전문 지도사가 함께 진행해 드립니다.",
      answer_at: "2026-07-28 11:30:00",
      created_at: "2026-07-28 11:00:00",
    },
  ],
  galleries: [
    {
      id: 1,
      title: "HDONE LIFE 고품격 전문 장례 행사 진행 현장",
      content: "정성을 다해 모시는 HDONE LIFE의 실제 장례 의전 지원 현장 사진입니다.",
      author: "관리자",
      views: 156,
      main_image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80",
      images_json: '["https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80"]',
      created_at: "2026-07-28 12:00:00",
    },
    {
      id: 2,
      title: "HDONE LIFE 웨딩 컨설팅 및 드레스 라인업",
      content: "아름답고 영원히 기억될 신부님의 스페셜 웨딩 갤러리입니다.",
      author: "관리자",
      views: 204,
      main_image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      images_json: '["https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"]',
      created_at: "2026-07-27 15:00:00",
    },
    {
      id: 3,
      title: "HDONE-LIFE 프리미엄 럭셔리 크루즈 투어",
      content: "동남아 고품격 크루즈 객실 및 부대시설 전경입니다.",
      author: "관리자",
      views: 178,
      main_image: "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=800&q=80",
      images_json: '["https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=800&q=80"]',
      created_at: "2026-07-26 16:00:00",
    },
  ],
  inquiries: [],
  users: [
    {
      id: 1,
      email: "admin",
      password: "admin1234",
      name: "HDONE 관리자",
      phone: "010-0000-0000",
      role: "admin",
      created_at: "2026-07-28 00:00:00",
    },
  ],
  popups: [],
};

function readDB(): DBStructure {
  if (!fs.existsSync(dbFilePath)) {
    fs.writeFileSync(dbFilePath, JSON.stringify(defaultData, null, 2), "utf8");
    return defaultData;
  }
  try {
    const raw = fs.readFileSync(dbFilePath, "utf8");
    return JSON.parse(raw);
  } catch (e) {
    fs.writeFileSync(dbFilePath, JSON.stringify(defaultData, null, 2), "utf8");
    return defaultData;
  }
}

function writeDB(data: DBStructure) {
  fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2), "utf8");
}

export const db = {
  prepare: (sql: string) => {
    return {
      get: (...args: any[]) => {
        const data = readDB();
        const lowerSql = sql.toLowerCase();

        if (lowerSql.includes("from site_config")) {
          return data.site_config[0] || null;
        }
        if (lowerSql.includes("from users where email = ?")) {
          const email = args[0];
          return data.users.find((u) => u.email === email || (u.role === "admin" && email === "admin")) || null;
        }
        if (lowerSql.includes("from notices where id = ?")) {
          const id = Number(args[0]);
          return data.notices.find((n) => n.id === id) || null;
        }
        if (lowerSql.includes("from notices where id < ?")) {
          const id = Number(args[0]);
          return data.notices.filter((n) => n.id < id).sort((a, b) => b.id - a.id)[0] || null;
        }
        if (lowerSql.includes("from notices where id > ?")) {
          const id = Number(args[0]);
          return data.notices.filter((n) => n.id > id).sort((a, b) => a.id - b.id)[0] || null;
        }
        if (lowerSql.includes("from qnas where id = ?")) {
          const id = Number(args[0]);
          return data.qnas.find((q) => q.id === id) || null;
        }
        if (lowerSql.includes("from galleries where id = ?")) {
          const id = Number(args[0]);
          return data.galleries.find((g) => g.id === id) || null;
        }
        if (lowerSql.includes("from galleries where id < ?")) {
          const id = Number(args[0]);
          return data.galleries.filter((g) => g.id < id).sort((a, b) => b.id - a.id)[0] || null;
        }
        if (lowerSql.includes("from galleries where id > ?")) {
          const id = Number(args[0]);
          return data.galleries.filter((g) => g.id > id).sort((a, b) => a.id - b.id)[0] || null;
        }
        if (lowerSql.includes("count(*) as total") || lowerSql.includes("count(*) as count")) {
          if (lowerSql.includes("from notices")) return { total: data.notices.length, count: data.notices.length };
          if (lowerSql.includes("from qnas")) return { total: data.qnas.length, count: data.qnas.length };
          if (lowerSql.includes("from galleries")) return { total: data.galleries.length, count: data.galleries.length };
          if (lowerSql.includes("from inquiries")) return { total: data.inquiries.length, count: data.inquiries.length };
          if (lowerSql.includes("from site_config")) return { count: data.site_config.length };
          if (lowerSql.includes("from users")) return { count: data.users.length };
        }
        return null;
      },
      all: (...args: any[]) => {
        const data = readDB();
        const lowerSql = sql.toLowerCase();

        if (lowerSql.includes("from main_slides")) {
          return data.main_slides.filter((s) => s.is_active === 1).sort((a, b) => a.display_order - b.display_order);
        }
        if (lowerSql.includes("from notices")) {
          const search = args[0] && typeof args[0] === "string" && args[0].startsWith("%") ? args[0].replace(/%/g, "") : "";
          let list = [...data.notices];
          if (search) {
            list = list.filter((n) => n.title.includes(search) || n.content.includes(search));
          }
          return list.sort((a, b) => (b.is_important - a.is_important) || (b.id - a.id));
        }
        if (lowerSql.includes("from qnas")) {
          return [...data.qnas].sort((a, b) => b.id - a.id);
        }
        if (lowerSql.includes("from galleries")) {
          return [...data.galleries].sort((a, b) => b.id - a.id);
        }
        if (lowerSql.includes("from inquiries")) {
          return [...data.inquiries].sort((a, b) => b.id - a.id);
        }
        if (lowerSql.includes("from popups")) {
          return data.popups.filter((p) => p.is_active === 1);
        }
        return [];
      },
      run: (...args: any[]) => {
        const data = readDB();
        const lowerSql = sql.toLowerCase();

        if (lowerSql.includes("update site_config")) {
          const [site_name, company_kr_name, phone, email, address, business_number, ceo_name, privacy_officer, hours] = args;
          data.site_config[0] = {
            ...data.site_config[0],
            site_name,
            company_kr_name,
            phone,
            email,
            address,
            business_number,
            ceo_name,
            privacy_officer,
            hours,
            updated_at: new Date().toISOString(),
          };
          writeDB(data);
          return { lastInsertRowid: 1 };
        }

        if (lowerSql.includes("insert into main_slides")) {
          const [title, subtitle, bg_image, link_url, display_order] = args;
          const newId = (data.main_slides.reduce((max, s) => Math.max(max, s.id), 0) || 0) + 1;
          data.main_slides.push({
            id: newId,
            title,
            subtitle,
            bg_image,
            link_url,
            is_active: 1,
            display_order: display_order || 1,
            created_at: new Date().toISOString(),
          });
          writeDB(data);
          return { lastInsertRowid: newId };
        }

        if (lowerSql.includes("insert into notices")) {
          const [title, content, is_important, attachment_name, attachment_url] = args;
          const newId = (data.notices.reduce((max, n) => Math.max(max, n.id), 0) || 0) + 1;
          const now = new Date().toISOString().replace("T", " ").substring(0, 19);
          data.notices.unshift({
            id: newId,
            title,
            content,
            author: "관리자",
            views: 0,
            is_important: is_important ? 1 : 0,
            attachment_name: attachment_name || null,
            attachment_url: attachment_url || null,
            created_at: now,
            updated_at: now,
          });
          writeDB(data);
          return { lastInsertRowid: newId };
        }

        if (lowerSql.includes("update notices set views")) {
          const id = Number(args[0]);
          const notice = data.notices.find((n) => n.id === id);
          if (notice) {
            notice.views += 1;
            writeDB(data);
          }
          return {};
        }

        if (lowerSql.includes("insert into qnas")) {
          const [title, content, author, password, is_secret] = args;
          const newId = (data.qnas.reduce((max, q) => Math.max(max, q.id), 0) || 0) + 1;
          const now = new Date().toISOString().replace("T", " ").substring(0, 19);
          data.qnas.unshift({
            id: newId,
            title,
            content,
            author,
            password: password || null,
            views: 0,
            is_secret: is_secret ? 1 : 0,
            is_answered: 0,
            answer: null,
            answer_at: null,
            created_at: now,
          });
          writeDB(data);
          return { lastInsertRowid: newId };
        }

        if (lowerSql.includes("update qnas set answer = ?")) {
          const [answer, id] = args;
          const qna = data.qnas.find((q) => q.id === Number(id));
          if (qna) {
            qna.answer = answer;
            qna.is_answered = 1;
            qna.answer_at = new Date().toISOString().replace("T", " ").substring(0, 19);
            writeDB(data);
          }
          return {};
        }

        if (lowerSql.includes("update qnas set views")) {
          const id = Number(args[0]);
          const qna = data.qnas.find((q) => q.id === id);
          if (qna) {
            qna.views += 1;
            writeDB(data);
          }
          return {};
        }

        if (lowerSql.includes("insert into galleries")) {
          const [title, content, main_image, images_json] = args;
          const newId = (data.galleries.reduce((max, g) => Math.max(max, g.id), 0) || 0) + 1;
          const now = new Date().toISOString().replace("T", " ").substring(0, 19);
          data.galleries.unshift({
            id: newId,
            title,
            content,
            author: "관리자",
            views: 0,
            main_image,
            images_json,
            created_at: now,
          });
          writeDB(data);
          return { lastInsertRowid: newId };
        }

        if (lowerSql.includes("update galleries set views")) {
          const id = Number(args[0]);
          const gal = data.galleries.find((g) => g.id === id);
          if (gal) {
            gal.views += 1;
            writeDB(data);
          }
          return {};
        }

        if (lowerSql.includes("insert into inquiries")) {
          const [name, phone, email, type, interest_product, title, content, attachment_url] = args;
          const newId = (data.inquiries.reduce((max, i) => Math.max(max, i.id), 0) || 0) + 1;
          const now = new Date().toISOString().replace("T", " ").substring(0, 19);
          data.inquiries.unshift({
            id: newId,
            name,
            phone,
            email,
            type,
            interest_product,
            title,
            content,
            attachment_url,
            is_agreed: 1,
            status: "접수대기",
            admin_note: null,
            created_at: now,
          });
          writeDB(data);
          return { lastInsertRowid: newId };
        }

        if (lowerSql.includes("update inquiries set status = ?")) {
          const [status, admin_note, id] = args;
          const inq = data.inquiries.find((i) => i.id === Number(id));
          if (inq) {
            inq.status = status;
            inq.admin_note = admin_note;
            writeDB(data);
          }
          return {};
        }

        if (lowerSql.includes("update users set password = ?")) {
          const [newPassword, targetId] = args;
          const user = data.users.find((u) => u.id === Number(targetId) || u.role === "admin" || u.email === "admin");
          if (user) {
            user.password = newPassword;
            writeDB(data);
          }
          return {};
        }

        if (lowerSql.includes("insert into users")) {
          const [email, password, name, phone] = args;
          const newId = (data.users.reduce((max, u) => Math.max(max, u.id), 0) || 0) + 1;
          const now = new Date().toISOString().replace("T", " ").substring(0, 19);
          data.users.push({
            id: newId,
            email,
            password,
            name,
            phone,
            role: "user",
            created_at: now,
          });
          writeDB(data);
          return { lastInsertRowid: newId };
        }

        if (lowerSql.includes("delete from")) {
          if (lowerSql.includes("from notices")) {
            const id = Number(args[0]);
            data.notices = data.notices.filter((n) => n.id !== id);
          } else if (lowerSql.includes("from qnas")) {
            const id = Number(args[0]);
            data.qnas = data.qnas.filter((q) => q.id !== id);
          } else if (lowerSql.includes("from galleries")) {
            const id = Number(args[0]);
            data.galleries = data.galleries.filter((g) => g.id !== id);
          } else if (lowerSql.includes("from inquiries")) {
            const id = Number(args[0]);
            data.inquiries = data.inquiries.filter((i) => i.id !== id);
          }
          writeDB(data);
          return {};
        }

        return {};
      },
    };
  },
};

export default db;
