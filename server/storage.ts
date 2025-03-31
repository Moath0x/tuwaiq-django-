import { 
  users, User, InsertUser,
  stories, Story, InsertStory,
  ageGroups, AgeGroup, InsertAgeGroup,
  themes, Theme, InsertTheme
} from "@shared/schema";

// Storage interface with CRUD operations
export interface IStorage {
  // User methods (kept from original template)
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Story methods
  getAllStories(): Promise<Story[]>;
  getStoryById(id: number): Promise<Story | undefined>;
  getFeaturedStories(): Promise<Story[]>;
  getStoriesByAgeGroup(ageGroup: string): Promise<Story[]>;
  getStoriesByTheme(theme: string): Promise<Story[]>;
  getRecentStories(limit: number): Promise<Story[]>;
  createStory(story: InsertStory): Promise<Story>;
  
  // Age Group methods
  getAllAgeGroups(): Promise<AgeGroup[]>;
  getAgeGroupById(id: number): Promise<AgeGroup | undefined>;
  createAgeGroup(ageGroup: InsertAgeGroup): Promise<AgeGroup>;
  
  // Theme methods
  getAllThemes(): Promise<Theme[]>;
  getThemeById(id: number): Promise<Theme | undefined>;
  createTheme(theme: InsertTheme): Promise<Theme>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private stories: Map<number, Story>;
  private ageGroups: Map<number, AgeGroup>;
  private themes: Map<number, Theme>;
  
  private userCurrentId: number;
  private storyCurrentId: number;
  private ageGroupCurrentId: number;
  private themeCurrentId: number;

  constructor() {
    this.users = new Map();
    this.stories = new Map();
    this.ageGroups = new Map();
    this.themes = new Map();
    
    this.userCurrentId = 1;
    this.storyCurrentId = 1;
    this.ageGroupCurrentId = 1;
    this.themeCurrentId = 1;
    
    // Initialize with default data
    this.initializeDefaultData();
  }

  // User methods (kept from original template)
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Story methods
  async getAllStories(): Promise<Story[]> {
    return Array.from(this.stories.values());
  }
  
  async getStoryById(id: number): Promise<Story | undefined> {
    return this.stories.get(id);
  }
  
  async getFeaturedStories(): Promise<Story[]> {
    return Array.from(this.stories.values()).filter(story => story.isFeatured);
  }
  
  async getStoriesByAgeGroup(ageGroup: string): Promise<Story[]> {
    return Array.from(this.stories.values()).filter(story => story.ageGroup === ageGroup);
  }
  
  async getStoriesByTheme(theme: string): Promise<Story[]> {
    return Array.from(this.stories.values()).filter(story => story.theme === theme);
  }
  
  async getRecentStories(limit: number): Promise<Story[]> {
    return Array.from(this.stories.values())
      .sort((a, b) => {
        // Handle null createdAt safely
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      })
      .slice(0, limit);
  }
  
  async createStory(insertStory: InsertStory): Promise<Story> {
    const id = this.storyCurrentId++;
    const now = new Date();
    // Make sure isFeatured and rating are not undefined to match the Story type
    const story: Story = {
      ...insertStory,
      id,
      createdAt: now,
      isFeatured: insertStory.isFeatured ?? false,
      rating: insertStory.rating ?? 0
    };
    this.stories.set(id, story);
    return story;
  }
  
  // Age Group methods
  async getAllAgeGroups(): Promise<AgeGroup[]> {
    return Array.from(this.ageGroups.values());
  }
  
  async getAgeGroupById(id: number): Promise<AgeGroup | undefined> {
    return this.ageGroups.get(id);
  }
  
  async createAgeGroup(insertAgeGroup: InsertAgeGroup): Promise<AgeGroup> {
    const id = this.ageGroupCurrentId++;
    const ageGroup: AgeGroup = { ...insertAgeGroup, id };
    this.ageGroups.set(id, ageGroup);
    return ageGroup;
  }
  
  // Theme methods
  async getAllThemes(): Promise<Theme[]> {
    return Array.from(this.themes.values());
  }
  
  async getThemeById(id: number): Promise<Theme | undefined> {
    return this.themes.get(id);
  }
  
  async createTheme(insertTheme: InsertTheme): Promise<Theme> {
    const id = this.themeCurrentId++;
    const theme: Theme = { ...insertTheme, id };
    this.themes.set(id, theme);
    return theme;
  }
  
  // Initialize with default data
  private initializeDefaultData() {
    // Initialize age groups
    const ageGroupsData: InsertAgeGroup[] = [
      { name: "الصغار", range: "3-5", color: "#FF6B6B" },
      { name: "المبتدئين", range: "6-8", color: "#4ECDC4" },
      { name: "المتوسطين", range: "9-11", color: "#FFD166" },
      { name: "المتقدمين", range: "12+", color: "#6A0572" }
    ];
    
    ageGroupsData.forEach(ageGroup => {
      this.createAgeGroup(ageGroup);
    });
    
    // Initialize themes
    const themesData: InsertTheme[] = [
      { name: "مغامرات", icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />', color: "#FF6B6B" },
      { name: "العائلة", icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />', color: "#4ECDC4" },
      { name: "حيوانات", icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />', color: "#FFD166" },
      { name: "خيال علمي", icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />', color: "#6A0572" },
      { name: "تعليمية", icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />', color: "#FF6B6B" },
      { name: "تراثية", icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />', color: "#4ECDC4" }
    ];
    
    themesData.forEach(theme => {
      this.createTheme(theme);
    });
    
    // Initialize stories
    const storiesData: InsertStory[] = [
      {
        title: "الأرنب والسلحفاة",
        content: `<p>في يوم من الأيام، كان هناك أرنب سريع ومغرور يتباهى دائماً بسرعته. وكان يسخر من السلحفاة البطيئة.</p>
                  <p>قالت السلحفاة للأرنب: "ربما أنت أسرع مني، لكنني أستطيع أن أتحداك في سباق!"</p>
                  <p>ضحك الأرنب وقال: "حسناً، سأقبل التحدي، لا شك أنني سأفوز."</p>
                  <p>بدأ السباق، وانطلق الأرنب بسرعة كبيرة، وابتعد عن السلحفاة بمسافة طويلة.</p>
                  <p>وفكر الأرنب: "أنا متقدم جداً، يمكنني أن أستريح قليلاً تحت ظل الشجرة."</p>
                  <p>وفي غضون ذلك، كانت السلحفاة تتحرك ببطء ولكن بثبات، دون توقف.</p>
                  <p>غفا الأرنب المغرور، واستغرق في نوم عميق.</p>
                  <p>استمرت السلحفاة في التقدم خطوة بخطوة، حتى تجاوزت الأرنب النائم.</p>
                  <p>استيقظ الأرنب أخيراً، ورأى أن السلحفاة قد اقتربت من خط النهاية.</p>
                  <p>ركض الأرنب بأقصى سرعة، لكنه لم يستطع اللحاق بالسلحفاة التي عبرت خط النهاية وفازت بالسباق.</p>
                  <p>تعلم الأرنب درساً مهماً: المثابرة والعزيمة قد تتغلبان على المواهب الطبيعية إذا لم تُستغل بشكل صحيح.</p>`,
        summary: "قصة كلاسيكية عن سباق بين أرنب سريع ومغرور وسلحفاة بطيئة ولكن مثابرة.",
        imageUrl: "/rabbit.png",
        ageGroup: "6-8",
        readingTime: 10,
        theme: "حيوانات",
        isFeatured: true,
        rating: 4
      },
      {
        title: "ليلى والذئب",
        content: `<p>كانت ليلى فتاة صغيرة تعيش مع أمها بالقرب من غابة كبيرة.</p>
                  <p>وفي يوم من الأيام، طلبت منها أمها أن تأخذ سلة من الطعام إلى جدتها المريضة التي تعيش وحدها في كوخ بالغابة.</p>
                  <p>حذرتها أمها قائلة: "اذهبي مباشرة إلى بيت جدتك، ولا تتحدثي مع الغرباء في الطريق."</p>
                  <p>وعدت ليلى أمها، وارتدت عباءتها الحمراء المفضلة وانطلقت في طريقها.</p>
                  <p>وبينما كانت تسير في الغابة، جذبتها الأزهار الجميلة، فتوقفت لتقطف بعضها.</p>
                  <p>وفجأة ظهر أمامها ذئب كبير وسألها: "إلى أين أنت ذاهبة يا صغيرتي؟"</p>
                  <p>نسيت ليلى تحذير أمها وأجابت: "أنا ذاهبة لزيارة جدتي المريضة، إنها تعيش في كوخ على الجانب الآخر من الغابة."</p>
                  <p>اقترح الذئب الماكر: "لماذا لا تأخذين هذا الطريق المختصر؟ ستصلين أسرع!"</p>
                  <p>أشار الذئب إلى طريق، بينما ركض هو في طريق آخر أسرع ليصل إلى بيت الجدة قبلها.</p>
                  <p>عندما وصلت ليلى أخيراً إلى بيت جدتها، كان هناك شيء غريب...</p>
                  <p>لاحظت ليلى التغييرات في مظهر "جدتها" وبدأت تسأل: "يا جدتي، ما أكبر عينيك!" فأجاب الذئب: "لأراك بشكل أفضل يا عزيزتي."</p>
                  <p>أكملت ليلى قائلة: "يا جدتي، ما أكبر أذنيك!" فأجاب الذئب: "لأسمعك بشكل أفضل يا عزيزتي."</p>
                  <p>وأخيراً سألت ليلى: "يا جدتي، ما أكبر أسنانك!" فقال الذئب: "لآكلك بشكل أفضل!"</p>
                  <p>صرخت ليلى بصوت عالٍ، وسمعها حطاب كان يعمل قريباً، فهرع لمساعدتها وأنقذها من الذئب.</p>
                  <p>تعلمت ليلى درساً مهماً في ذلك اليوم: دائماً استمع لنصائح والديك، ولا تتحدث مع الغرباء.</p>`,
        summary: "مغامرة فتاة صغيرة في الغابة وما تعلمته من لقائها مع ذئب ماكر.",
        imageUrl: "/littlered.png",
        ageGroup: "3-5",
        readingTime: 8,
        theme: "مغامرات",
        isFeatured: true,
        rating: 5
      },
      {
        title: "علاء الدين",
        content: `<p>في مدينة بعيدة، كان هناك شاب فقير اسمه علاء الدين. كان يعيش مع أمه ويكسب قوته من السرقات الصغيرة في السوق.</p>
                  <p>في يوم من الأيام، قابل علاء الدين رجلاً غريباً ادعى أنه عمه، وطلب منه المساعدة في استرجاع مصباح من كهف قديم.</p>
                  <p>وافق علاء الدين، ودخل إلى الكهف المليء بالكنوز. وجد المصباح، لكن عندما رفض إعطاءه للرجل قبل أن يخرج من الكهف، غضب الرجل وأغلق مدخل الكهف، تاركاً علاء الدين محبوساً في الداخل.</p>
                  <p>وبينما كان علاء الدين يفكر في طريقة للخروج، لمس المصباح بيده دون قصد، فخرج منه مارد عملاق!</p>
                  <p>قال المارد: "أنا خادم المصباح، وسأحقق لك ثلاث أمنيات."</p>
                  <p>طلب علاء الدين أولاً الخروج من الكهف، ثم العودة إلى بيته مع بعض الكنوز ليعيش هو وأمه في راحة.</p>
                  <p>وفي الأيام التالية، علم علاء الدين أن ابنة السلطان، الأميرة ياسمين، ستتزوج قريباً. وقد وقع في حبها عندما رآها في السوق ذات يوم.</p>
                  <p>استخدم علاء الدين المصباح ليصبح أميراً ثرياً، وذهب ليطلب يد الأميرة من السلطان.</p>
                  <p>لكن الساحر الشرير (الرجل الغريب) عاد، وسرق المصباح من قصر علاء الدين، وأمر المارد بنقل القصر والأميرة إلى مكان بعيد.</p>
                  <p>لم يستسلم علاء الدين، بل تتبع الساحر وبذكائه استطاع استعادة المصباح والأميرة.</p>
                  <p>وأخيراً، أدرك علاء الدين أن قوته الحقيقية ليست في المصباح السحري، بل في شجاعته وذكائه.</p>
                  <p>وعاش علاء الدين والأميرة ياسمين في سعادة، واستخدما ثروتهما لمساعدة الفقراء في المملكة.</p>`,
        summary: "قصة شاب فقير يعثر على مصباح سحري يغير حياته إلى الأبد.",
        imageUrl: "/aladdin.png",
        ageGroup: "9-11",
        readingTime: 15,
        theme: "خيال علمي",
        isFeatured: true,
        rating: 4
      },
      {
        title: "الفيل الصغير",
        content: `<p>في غابة إفريقية جميلة، ولد فيل صغير اسمه توتو. كان توتو محباً للمرح، لكنه كان يشعر بالحزن لأن خرطومه كان أقصر من خراطيم الأفيال الأخرى.</p>
                  <p>كانت الحيوانات الأخرى تسخر منه أحياناً: "انظروا إلى توتو! فيل بخرطوم قصير!"</p>
                  <p>حزن توتو كثيراً، وقرر أن يبتعد عن القطيع ويعيش وحيداً.</p>
                  <p>وذات يوم، بينما كان توتو يمشي بالقرب من النهر، سمع صرخات استغاثة. كانت قرود صغيرة قد علقت على شجرة وسط النهر بعد أن ارتفع منسوب المياه فجأة.</p>
                  <p>حاولت الحيوانات الأخرى مساعدة القرود، لكن النهر كان عميقاً والتيار قوياً.</p>
                  <p>فكّر توتو قليلاً، ثم خطرت له فكرة! وقف على ضفة النهر، ومد خرطومه القصير نحو الشجرة.</p>
                  <p>"اقفزوا على خرطومي!" صاح توتو للقرود.</p>
                  <p>قفزت القرود الصغيرة على خرطوم توتو الواحدة تلو الأخرى، وتمكن من إنقاذهم جميعاً.</p>
                  <p>كانت الحيوانات مندهشة من شجاعة توتو وذكائه. وأدركوا جميعاً أن خرطومه القصير كان مثالياً لهذه المهمة، فلو كان خرطومه طويلاً لما استطاع الوصول إلى القرود بنفس السهولة.</p>
                  <p>منذ ذلك اليوم، أصبح توتو بطلاً في الغابة، وتعلم درساً مهماً: أحياناً ما نعتبره نقصاً قد يكون في الحقيقة ميزة خاصة.</p>
                  <p>وعاش توتو سعيداً مع أصدقائه الجدد، فخوراً بخرطومه القصير.</p>`,
        summary: "قصة فيل صغير يتعلم أهمية الصداقة في الغابة",
        imageUrl: "/elephant.png",
        ageGroup: "3-5",
        readingTime: 5,
        theme: "حيوانات",
        isFeatured: false,
        rating: 4
      },
      {
        title: "القطة الذكية",
        content: `<p>في منزل صغير في قرية هادئة، كانت تعيش قطة رمادية ذكية اسمها ميمي. كانت ميمي تتميز بقدرتها العجيبة على فهم مشاكل أصدقائها من الحيوانات ومساعدتهم في حلها.</p>
                  <p>في يوم من الأيام، جاء إلى ميمي كلب صغير حزين اسمه روفي. قال روفي: "ميمي، لقد فقدت عظمتي المفضلة، ولا أستطيع تذكر أين وضعتها!"</p>
                  <p>فكرت ميمي قليلاً ثم قالت: "لا تقلق يا روفي، سأساعدك في البحث عنها."</p>
                  <p>بدأت ميمي بطرح بعض الأسئلة: "أين كنت تلعب اليوم؟ مع من لعبت؟ متى كانت آخر مرة رأيت فيها العظمة؟"</p>
                  <p>أجاب روفي: "لعبت في الحديقة، ثم زرت بيت الأرنب لولو، وبعدها ذهبت إلى بركة الماء حيث التقيت بالبطة كوكي."</p>
                  <p>قالت ميمي: "حسناً، لنذهب إلى هذه الأماكن بالترتيب ونبحث."</p>
                  <p>ذهبا أولاً إلى الحديقة، لكنهما لم يجدا العظمة. ثم ذهبا إلى بيت لولو، وسألت ميمي: "هل رأيت عظمة روفي؟"</p>
                  <p>أجابت لولو: "نعم، كان يلعب بها هنا، لكنه أخذها معه عندما غادر."</p>
                  <p>ثم انتقلا إلى بركة الماء، وهناك رأت ميمي علامات أقدام روفي تقود إلى شجرة كبيرة.</p>
                  <p>"أتذكر الآن!" صاح روفي، "لقد دفنت العظمة تحت هذه الشجرة لأحتفظ بها للمستقبل!"</p>
                  <p>حفر روفي تحت الشجرة، ووجد عظمته المفضلة. كان سعيداً جداً وشكر ميمي على مساعدتها.</p>
                  <p>انتشرت قصة ميمي القطة الذكية في أنحاء القرية، وأصبح كل حيوان يواجه مشكلة يأتي إليها طلباً للمساعدة.</p>
                  <p>وهكذا، أصبحت ميمي معروفة بحكمتها وقدرتها على حل المشكلات، وكانت سعيدة بمساعدة أصدقائها.</p>`,
        summary: "مغامرات قطة ذكية تساعد أصدقاءها في حل المشكلات",
        imageUrl: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        ageGroup: "6-8",
        readingTime: 7,
        theme: "حيوانات",
        isFeatured: false,
        rating: 5
      },
      {
        title: "المغامرون الثلاثة",
        content: `<p>كان سامي وليلى وكريم أصدقاء منذ الصغر. في إحدى الإجازات الصيفية، زاروا جدة سامي في قريتها الساحلية الصغيرة.</p>
                  <p>وذات مساء، وجدوا في علية منزل الجدة صندوقاً قديماً يحتوي على خريطة غامضة. كانت الخريطة تشير إلى جزيرة صغيرة قريبة، وكانت مرسومة عليها علامة "X" مع عبارة "هنا يرقد الكنز المفقود".</p>
                  <p>قرر الأصدقاء الثلاثة استكشاف هذه الخريطة. أخبروا الجدة عن خططهم، فسمحت لهم بالذهاب في رحلة نهارية إلى الجزيرة، بشرط أن يعودوا قبل الغروب.</p>
                  <p>استعاروا قارباً صغيراً من صديق الجدة الصياد، وانطلقوا في صباح اليوم التالي نحو الجزيرة.</p>
                  <p>كانت الجزيرة صغيرة وجميلة، مليئة بالأشجار والصخور. اتبعوا الخريطة بدقة، وبعد ساعات من البحث، وصلوا إلى كهف صغير مخفي بين الصخور.</p>
                  <p>"هذا هو المكان!" صاح سامي بحماس.</p>
                  <p>دخلوا الكهف بحذر، مستخدمين المصابيح التي أحضروها معهم. وفي نهاية الكهف، وجدوا صندوقاً خشبياً قديماً.</p>
                  <p>فتحوا الصندوق ببطء، متوقعين أن يجدوا ذهباً أو مجوهرات. لكن المفاجأة كانت كبيرة عندما وجدوا داخل الصندوق كتاباً قديماً جداً، وبجانبه رسالة.</p>
                  <p>قرأ كريم الرسالة بصوت عالٍ: "إلى من يجد هذا الكنز - الكنز الحقيقي ليس في الذهب أو الفضة، بل في المعرفة والصداقة. هذا الكتاب يحتوي على قصص وحكايات من مختلف أنحاء العالم، جمعتها خلال رحلاتي. استمتعوا بها وتعلموا منها."</p>
                  <p>كان الأصدقاء الثلاثة في البداية مخيبي الآمال قليلاً، لكنهم سرعان ما أدركوا قيمة ما وجدوه. أخذوا الكتاب معهم وعادوا إلى منزل الجدة.</p>
                  <p>في الأمسيات التالية، كانوا يجلسون مع الجدة ويقرأون القصص من الكتاب. كانت قصصاً مذهلة عن مغامرات وأسفار ومغامرين من كل أنحاء العالم.</p>
                  <p>وقبل نهاية الإجازة، اكتشفوا رسالة سرية مخبأة في غلاف الكتاب، تشير إلى كنز آخر في مكان بعيد...</p>
                  <p>وهكذا بدأت سلسلة من المغامرات الرائعة للأصدقاء الثلاثة، الذين أدركوا أن الصداقة والمغامرة والمعرفة هي الكنوز الحقيقية في الحياة.</p>`,
        summary: "ثلاثة أصدقاء يكتشفون كنزاً مخفياً في جزيرة غامضة",
        imageUrl: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        ageGroup: "9-11",
        readingTime: 12,
        theme: "مغامرات",
        isFeatured: false,
        rating: 4
      },
      {
        title: "رحلة إلى الفضاء",
        content: `<p>كانت سارة فتاة في الثانية عشرة من عمرها، شغوفة بالفضاء والكواكب والنجوم. كانت تقضي كل ليلة في مراقبة السماء بتلسكوب صغير أهداه إياها والدها في عيد ميلادها.</p>
                  <p>في المدرسة، أعلنت المعلمة عن مسابقة علمية، الفائز فيها سيحصل على فرصة لزيارة مركز الفضاء الوطني وحضور إطلاق صاروخ.</p>
                  <p>قررت سارة المشاركة بمشروع عن "كيفية العيش في محطة فضائية". عملت بجد لأسابيع، قرأت كتباً ومقالات، وتحدثت مع خبراء عبر الإنترنت، وصممت نموذجاً لمحطة فضائية مستقبلية.</p>
                  <p>يوم المسابقة، عرضت سارة مشروعها أمام لجنة التحكيم. كان عرضها مميزاً، مليئاً بالمعلومات العلمية الدقيقة والحلول الإبداعية للمشكلات التي تواجه رواد الفضاء.</p>
                  <p>فازت سارة بالمركز الأول! كانت سعيدة جداً بفرصة زيارة مركز الفضاء الوطني.</p>
                  <p>في يوم الزيارة، اصطحبها والدها إلى المركز. كان المكان مذهلاً، مليئاً بالنماذج والصور والمعدات الفضائية.</p>
                  <p>التقت سارة برائدة فضاء حقيقية، الدكتورة ليلى، التي أخذتها في جولة خاصة في المركز.</p>
                  <p>"ما هو حلمك يا سارة؟" سألتها الدكتورة ليلى.</p>
                  <p>"أريد أن أصبح رائدة فضاء وأسافر إلى المريخ يوماً ما!" أجابت سارة بحماس.</p>
                  <p>ابتسمت الدكتورة ليلى وقالت: "هذا حلم رائع. عندما كنت في عمرك، كان لدي نفس الحلم. استمري في العمل الجاد والدراسة، وخاصة في الرياضيات والعلوم."</p>
                  <p>وأضافت: "لدي مفاجأة لك. غداً سيكون هناك اتصال مباشر مع رواد الفضاء في محطة الفضاء الدولية، وأريدك أن تكوني معنا وتسألي سؤالاً."</p>
                  <p>في اليوم التالي، وقفت سارة أمام شاشة كبيرة، وتحدثت مباشرة مع رواد فضاء يدورون حول الأرض في ذلك الوقت!</p>
                  <p>سألت سارة: "ما هو أصعب شيء في العيش في الفضاء؟"</p>
                  <p>أجاب رائد الفضاء: "الابتعاد عن العائلة والأصدقاء هو الأصعب. لكن المناظر المذهلة للأرض من الفضاء تستحق ذلك!"</p>
                  <p>بعد الزيارة، عادت سارة إلى المنزل مليئة بالإلهام والحماس. وضعت خطة لمستقبلها: دراسة الهندسة الفضائية، والتدرب بجد لتصبح رائدة فضاء.</p>
                  <p>وبدأت تكتب في دفترها: "رحلتي إلى الفضاء: الفصل الأول..."</p>`,
        summary: "مغامرة علمية مثيرة لطفلة تحلم بأن تصبح رائدة فضاء",
        imageUrl: "https://cdn-icons-png.flaticon.com/512/2590/2590482.png",
        ageGroup: "12+",
        readingTime: 18,
        theme: "خيال علمي",
        isFeatured: false,
        rating: 5
      }
    ];
    
    storiesData.forEach(story => {
      this.createStory(story);
    });
  }
}

export const storage = new MemStorage();
