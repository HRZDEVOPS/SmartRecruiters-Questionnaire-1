# SmartRecruiters Recruiting Priorities Finder

A three-question questionnaire that gives prospects an immediate, personalized
answer about which SmartRecruiters capabilities address their recruiting
priorities, and how those capabilities compare with SAP SuccessFactors
Recruiting today.

The layout follows the HRIZONS JDMS Challenge Finder template. Questions,
challenges, responses, statistics, and feature comparisons come from the HRIZONS
Solution Guide *Building the Business Case for SmartRecruiters*
(`SmartRecruiters__Exec_Summary_w_Matrix_260814.pdf`).

## How it works

1. **Role:** HR/People Leader, Talent Acquisition, Hiring Manager, HR
   Technology/HRIS/IT, HR Operations/Change Management, Executive Sponsor, Other.
2. **What the recruiting technology should provide:** recruiter productivity,
   time-to-fill, candidate engagement, hiring manager participation, flexible
   workflows, AI readiness, SAP SuccessFactors integration, or not sure.
3. **Biggest recruiting challenge:** workarounds, hiring manager adoption,
   candidate drop-off, slow hiring, limited resources, SAP timeline uncertainty,
   complex data and integrations, or the business case.

The result combines a role-specific opening, the opportunity for the chosen
priority, guidance for the chosen challenge, four SmartRecruiters capabilities
(each with the guide's SAP SuccessFactors Recruiting comparison where one
exists), and calls to action for the executive guide and a readiness assessment.

## Files

- `index.html` — standalone version. Open it in a browser to preview. To embed
  it on any page (for example a WordPress Custom HTML block), copy everything
  between the `BEGIN EMBED` and `END EMBED` comments. Styles are self-contained
  and scoped to `#sr-recruiting-finder`.
- `microsite/` — the version used on the SmartRecruiters Business Case microsite
  (`HRZDEVOPS/SmartRecruitersLandingPage`), styled with the HRIZONS design
  tokens (`tokens.css`):
  - `recruiting-finder-section.html` — section markup
  - `recruiting-finder.css` — styles
  - `recruiting-finder.js` — questions, copy, and logic

## Editing content

All copy lives in the data objects at the top of the script (`roles`,
`features`, `goals`, `challenges`). Button labels for the three questions live in
the HTML. Each answer button's `data-sr-answer` code (for example `goal:C`) must
match a key in the script. When you change content, update both `index.html` and
`microsite/recruiting-finder.js` so the two versions stay in sync.

## Analytics

On completion the finder reports `sr_finder_completed` with `sr_role`,
`sr_goal`, `sr_challenge`, and `sr_result`. Only answer codes are sent, never
personal data. `finder_started` fires when a visitor begins.

- Standalone: pushes to `window.dataLayer` when Google Tag Manager is on the page.
- Microsite: dispatches the platform's `campaign:track` event, which adds
  `campaign_id` and `journey` and respects analytics consent.
