// SmartRecruiters Recruiting Priorities Finder: three questions, then an immediate personalized result.
// Layout follows the JDMS Challenge Finder template. Copy, statistics, and feature comparisons come from
// the HRIZONS Solution Guide "Building the Business Case for SmartRecruiters" (Exec Summary w/ Matrix, 260814).
// Analytics goes through the platform's campaign:track event; only answer codes are reported.
(() => {
  const root = document.getElementById('sr-recruiting-finder');
  if (!root) return;

  const answers = { role: null, goal: null, challenge: null };

  const roles = {
    A: { label: 'HR / People Leader', opening: "As an HR/People leader, you're accountable for a recruiting strategy that keeps up with the pace of business, and for how the move to SmartRecruiters affects your people, processes and long-term roadmap." },
    B: { label: 'Talent Acquisition / Recruiting', opening: 'Recruiters are the primary users of the platform. Your success depends on streamlined workflows, automation that eliminates repetitive administrative tasks and meaningful analytics that support better hiring decisions.' },
    C: { label: 'Hiring Manager / Business Leader', opening: 'Hiring managers are frequently the most overlooked audience in recruiting technology projects, yet you play a critical role in every successful hire.' },
    D: { label: 'HR Technology / HRIS / IT', opening: 'SmartRecruiters will become part of a broader SAP SuccessFactors ecosystem, so integration requirements, reporting dependencies, data governance and security all land on your desk.' },
    E: { label: 'HR Operations / Change Management', opening: 'Technology provides the capabilities, but people determine whether they translate into business value. Change management is a strategic discipline that begins long before go-live and continues well after it.' },
    F: { label: 'Executive Sponsor (CHRO, CIO, CFO)', opening: "SAP's acquisition of SmartRecruiters is one of the most significant changes to the Talent Acquisition technology landscape in a decade. Organizations that start early keep control of the timeline, budget and implementation approach." },
    G: { label: 'Other', opening: 'Every interaction with your recruiting platform shapes how candidates, recruiters and hiring managers experience your organization.' }
  };

  // Capabilities from the guide's feature comparison (pages 7-8). `compare` is the guide's
  // SAP SuccessFactors Recruiting column, shown so current SAP customers can see the difference.
  const features = {
    bulk: ['Bulk Actions & Recruitment Automation', 'Perform bulk candidate communications, interview scheduling, status updates and workflow automation, ideal for high-volume hiring.', 'Bulk updates often require navigating multiple workflows or manual coordination.'],
    scheduling: ['Automated Interview Scheduling & Rescheduling', 'Automated scheduling for 1:1, panel, bulk and event interviews, with candidate self-service rescheduling by email, SMS and WhatsApp.', 'Interview updates commonly require cancelling and re-issuing invitations.'],
    profile: ['Unified Candidate Profile & Duplicate Management', 'One profile consolidates applications, communications and CRM activity, with automatic duplicate detection and merging.', 'Duplicate management is handled manually, and candidate activity may span multiple records.'],
    crm: ['Unified CRM & Talent Pipelines', 'Built-in CRM enables proactive talent pooling, segmentation and nurture campaigns directly within recruiting workflows.', 'CRM capabilities are typically extended through partner solutions or integrations.'],
    approvals: ['Flexible Job Configuration & Approvals', 'Dynamic fields, configurable logic and flexible approval workflows reduce admin effort and let hiring processes adapt quickly.', 'The structured configuration model often requires administrative updates or template changes.'],
    managers: ['Hiring Manager Collaboration', 'Feedback, approvals and collaboration directly within familiar tools and mobile experiences, improving adoption across hiring teams.', 'Hiring manager workflows often rely on structured navigation and additional training.'],
    roleBased: ['Simplified, Role-Based Experience', 'Hiring managers review candidates, provide feedback, collaborate with recruiters and move candidates forward with minimal effort.'],
    candidateExperience: ['Flexible Candidate Experiences', 'Configurable application journeys tailored by hiring type, from quick-apply hourly roles to detailed professional applications.', 'Application experiences are configurable but typically more template-driven.'],
    messaging: ['Multi-Channel Candidate Communication', 'Native communication across email, SMS, WhatsApp, Microsoft Teams and Slack, with full conversation history in one place.', 'Communication is primarily email-based; additional channels require integrations.'],
    multiBrand: ['Multi-Brand Recruiting', 'Manage multiple brands, business units or regions in one instance, each with dedicated career experiences, workflows and branding, while sharing data and governance.', 'Multi-brand is supported through career site configuration with a more segmented setup model.'],
    workflows: ['Configurable Hiring Workflows', 'Drag-and-drop hiring processes let teams design workflows for high-volume, campus, professional and executive hiring within one platform.', 'Multiple workflow templates are supported but typically require deeper configuration and administrative setup.'],
    volume: ['High-Volume & Professional Hiring in One Platform', 'Rapid, high-volume hiring with bulk actions and simplified applications alongside structured professional workflows, in the same environment.', 'Hiring models are often managed through separate configuration approaches and templates.'],
    processFlex: ['Hiring Process Flexibility', 'Include multiple assessments, background checks and other tools throughout your processes to capture every candidate requirement.', 'Limited to one assessment or background check in a hiring process.'],
    ai: ['AI-Driven Recommendations', 'SmartRecruiters introduces AI-driven recommendations and user experiences designed specifically for today’s hiring environment.'],
    ecosystem: ['Part of the SAP SuccessFactors Ecosystem', 'SmartRecruiters will connect with Employee Central, Onboarding, Workforce Analytics, SAP Business AI and future Talent Intelligence capabilities.'],
    sideBySide: ['Side-by-Side Migration', 'SAP allows recruiting teams to run SAP SuccessFactors Recruiting alongside SmartRecruiters, simplifying migration and reducing system disruption.'],
    integrationPlan: ['Integration & Governance Planning', 'Evaluate current workflows, integration requirements, reporting dependencies, data governance models and security and compliance requirements with HRIZONS.'],
    everyUser: ['Designed for Every User', 'Tailor workflows and interfaces to candidates, recruiters and hiring managers for stronger adoption and a greater return on your investment.'],
    maturity: ['Recruiting Maturity Assessment', 'Evaluate your current recruiting maturity and identify the improvements that will deliver value first.'],
    roadmap: ['A Roadmap Aligned with Your Business', 'Align recruiting technology with long-term business objectives, on a timeline you control.']
  };

  const goals = {
    A: {
      title: 'Your Recruiting Priority: Recruiter Productivity',
      copy: 'Recruiters need streamlined workflows and automation that eliminates repetitive administrative tasks. Based on your responses, your biggest opportunity may be helping recruiters spend less time managing the recruiting system and more time building relationships with candidates and hiring managers.',
      features: ['bulk', 'scheduling', 'profile', 'crm'],
      cta: 'See How SmartRecruiters Boosts Recruiter Productivity →'
    },
    B: {
      title: 'Your Recruiting Priority: Reducing Time-to-Fill',
      copy: 'Every delay in scheduling, approvals and feedback adds time to every hire. Based on your responses, your biggest opportunity may be removing those delays. In a 2025 SmartRecruiters case study, organizations saw a 75% reduction in time from post to hire, with 37% of openings filled before their target date.',
      features: ['scheduling', 'approvals', 'managers', 'bulk'],
      cta: 'See How SmartRecruiters Shortens Time-to-Fill →'
    },
    C: {
      title: 'Your Recruiting Priority: Candidate Engagement',
      copy: "Every interaction with your recruiting platform shapes a candidate's perception of your organization. Based on your responses, your biggest opportunity may be simplifying the application process and improving communication throughout the hiring journey. A 2025 SmartRecruiters case study reported a 38% increase in application-to-hire rate.",
      features: ['candidateExperience', 'messaging', 'scheduling', 'multiBrand'],
      cta: 'Explore the SmartRecruiters Candidate Experience →'
    },
    D: {
      title: 'Your Recruiting Priority: Hiring Manager Participation',
      copy: 'When the hiring manager experience is cumbersome, adoption suffers, feedback is delayed and hiring decisions slow dramatically. Based on your responses, your biggest opportunity may be making participation easy enough that hiring managers become true partners in hiring.',
      features: ['managers', 'roleBased', 'approvals', 'scheduling'],
      cta: 'See How SmartRecruiters Engages Hiring Managers →'
    },
    E: {
      title: 'Your Recruiting Priority: Flexibility for Every Type of Hire',
      copy: 'Different roles call for different hiring processes. Based on your responses, your biggest opportunity may be supporting high-volume, campus, professional and executive hiring, across brands and regions, within one configurable platform.',
      features: ['workflows', 'volume', 'multiBrand', 'processFlex'],
      cta: 'Explore SmartRecruiters Configurability →'
    },
    F: {
      title: 'Your Recruiting Priority: AI Readiness',
      copy: "SAP's vision to become the leading Business AI company places Talent Acquisition at the center of future innovation. Based on your responses, your biggest opportunity may be building the foundation AI depends on: clean recruiting data, standardized workflows, consistent hiring processes, strong governance and integrated HR systems.",
      features: ['ai', 'profile', 'workflows', 'ecosystem'],
      cta: 'Get Your Recruiting Data Ready for AI →'
    },
    G: {
      title: 'Your Recruiting Priority: SAP SuccessFactors Integration',
      copy: 'SmartRecruiters will ultimately become part of a broader SAP SuccessFactors ecosystem. Based on your responses, your biggest opportunity may be planning integrations, reporting dependencies and data governance early. Early planning reduces implementation risk and avoids costly redesign later.',
      features: ['ecosystem', 'sideBySide', 'processFlex', 'integrationPlan'],
      cta: 'Plan Your SmartRecruiters Integration →'
    },
    H: {
      title: 'Your Recruiting Opportunity: Finding the Right Starting Point',
      copy: "You're not alone. Many SAP SuccessFactors Recruiting customers are still evaluating how SmartRecruiters will affect their recruiting strategy, technology investments and roadmap. Based on your responses, your biggest opportunity may be assessing your current recruiting maturity and building a roadmap before timelines are set for you.",
      features: ['maturity', 'everyUser', 'sideBySide', 'roadmap'],
      cta: 'Get Your SmartRecruiters Readiness Roadmap →'
    }
  };

  const challenges = {
    A: 'You told us recruiters rely on workarounds and manual administration. That is a common sign of a platform that works as designed but never achieves real adoption. Automating routine tasks and configuring workflows around how recruiters actually work frees them to focus on candidates and hiring managers.',
    B: 'You told us hiring managers fall back on email and spreadsheets. When participation is time-consuming, feedback is delayed and decisions slow down. Bringing feedback and approvals into familiar tools and mobile experiences makes it easier for managers to stay engaged.',
    C: 'You told us candidates drop off or receive inconsistent communication. A complicated application, poor communication or a lack of transparency can quickly discourage top talent from applying or accepting an offer. Evaluating every touchpoint, from job discovery to offer acceptance, is the place to start.',
    D: 'You told us hiring takes too long. Manual scheduling, rigid approvals and slow feedback add days to every hire. Organizations that modernize these steps reduce time-to-fill and gain a real competitive advantage in the market for talent.',
    E: 'You told us internal resources are limited. Major technology transitions place significant demands on HR, Talent Acquisition, IT and change management teams, and organizations that delay often face resource shortages and compressed timelines. Starting early lets you plan the work around your team, not the other way around.',
    F: "You told us you're unsure about SAP's timeline. Many organizations assume they can wait for SAP to publish final timelines, but history suggests otherwise. Because SAP allows SAP SuccessFactors Recruiting to run alongside SmartRecruiters, you can plan a phased move on your own terms.",
    G: 'You told us your recruiting data and integrations are complex. Reporting dependencies, data governance models and security and compliance requirements all take time to map. Evaluating them now reduces implementation risk and avoids costly redesign efforts later.',
    H: 'You told us building the business case is your biggest hurdle. Organizations that treat this as a business transformation, rather than a software migration, consistently achieve better outcomes: faster hiring, higher application-to-hire rates and more openings filled on time. Our executive guide is designed to help you make that case.'
  };

  const $ = (id) => document.getElementById(id);
  const intro = $('sr-intro');
  const progress = $('sr-progress-wrapper');
  const questions = $('sr-questions');
  const result = $('sr-result');
  const total = 3;

  const emit = (eventName, parameters = {}) => {
    document.dispatchEvent(new CustomEvent('campaign:track', { detail: { eventName, parameters } }));
  };

  // Keep the finder in view (clear of the sticky header) and move focus for screen-reader users.
  const focusHeading = (container) => {
    const heading = container.querySelector('h2, h3');
    heading?.focus({ preventScroll: true });
    const top = root.getBoundingClientRect().top;
    const headerOffset = parseFloat(getComputedStyle(root).scrollMarginTop) || 0;
    if (top < headerOffset || top > innerHeight * 0.4) root.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  function showQuestion(number) {
    root.querySelectorAll('[data-sr-question]').forEach((el) => { el.hidden = el.dataset.srQuestion !== String(number); });
    $('sr-progress-label').textContent = `Question ${number} of ${total}`;
    $('sr-progress-bar').style.width = `${(number / total) * 100}%`;
    focusHeading($(`sr-question-${number}`));
  }

  function start() {
    intro.hidden = true;
    progress.hidden = false;
    questions.hidden = false;
    showQuestion(1);
    emit('finder_started', { finder_id: 'sr-recruiting-finder' });
  }

  function featureCard([titleText, descriptionText, compareText]) {
    const box = document.createElement('div');
    box.className = 'sr-feature';
    const title = document.createElement('div');
    title.className = 'sr-feature-title';
    title.textContent = titleText;
    const description = document.createElement('p');
    description.className = 'sr-feature-description';
    description.textContent = descriptionText;
    box.append(title, description);
    if (compareText) {
      const compare = document.createElement('p');
      compare.className = 'sr-feature-compare';
      const label = document.createElement('span');
      label.textContent = 'In SAP SuccessFactors Recruiting today: ';
      compare.append(label, compareText);
      box.append(compare);
    }
    return box;
  }

  function showResult() {
    questions.hidden = true;
    progress.hidden = true;

    const goal = goals[answers.goal];
    $('sr-role-opening').textContent = roles[answers.role].opening;
    $('sr-result-title').textContent = goal.title;
    $('sr-goal-copy').textContent = goal.copy;
    $('sr-challenge-copy').textContent = challenges[answers.challenge];
    $('sr-features').replaceChildren(...goal.features.map((key) => featureCard(features[key])));
    $('sr-primary-cta').textContent = goal.cta;

    result.hidden = false;
    focusHeading(result);

    emit('sr_finder_completed', {
      sr_role: answers.role,
      sr_goal: answers.goal,
      sr_challenge: answers.challenge,
      sr_result: goal.title
    });
  }

  function answer(type, value) {
    answers[type] = value;
    if (type === 'role') showQuestion(2);
    else if (type === 'goal') showQuestion(3);
    else if (type === 'challenge') showResult();
  }

  function restart() {
    answers.role = answers.goal = answers.challenge = null;
    result.hidden = true;
    progress.hidden = true;
    questions.hidden = true;
    intro.hidden = false;
    focusHeading(intro);
  }

  root.addEventListener('click', (event) => {
    const target = event.target.closest('button');
    if (!target) return;
    if (target.matches('[data-sr-start]')) start();
    else if (target.matches('[data-sr-restart]')) restart();
    else if (target.dataset.srAnswer) {
      const [type, value] = target.dataset.srAnswer.split(':');
      answer(type, value);
    }
  });
})();
