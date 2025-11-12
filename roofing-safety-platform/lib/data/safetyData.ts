import { SafetyMetrics, Incident, SafetyAlert, SafetyArticle } from '../types';

export const safetyMetrics: SafetyMetrics[] = [
  // Aggregate metrics (all companies)
  {
    period: 'year',
    hoursWorked: 285600,
    incidentCount: 3,
    lostTimIncidents: 1,
    nearMisses: 47,
    trir: 2.1,
    ltir: 0.7,
    daysWithoutIncident: 142,
    compliancePercentage: 97,
    trainingCompletionRate: 94,
    activeCertifications: 147,
    expiringCertifications: 12,
  },
  // Eagle Roofing metrics
  {
    companyId: 'eagle-roofing',
    period: 'year',
    hoursWorked: 93600,
    incidentCount: 1,
    lostTimIncidents: 0,
    nearMisses: 15,
    trir: 2.1,
    ltir: 0.0,
    daysWithoutIncident: 365,
    compliancePercentage: 98,
    trainingCompletionRate: 96,
    activeCertifications: 52,
    expiringCertifications: 4,
  },
  // Central Oregon metrics
  {
    companyId: 'central-oregon',
    period: 'year',
    hoursWorked: 129024,
    incidentCount: 1,
    lostTimIncidents: 1,
    nearMisses: 21,
    trir: 1.5,
    ltir: 1.5,
    daysWithoutIncident: 89,
    compliancePercentage: 96,
    trainingCompletionRate: 93,
    activeCertifications: 64,
    expiringCertifications: 5,
  },
  // Palmer Roofing metrics
  {
    companyId: 'palmer-roofing',
    period: 'year',
    hoursWorked: 62976,
    incidentCount: 1,
    lostTimIncidents: 0,
    nearMisses: 11,
    trir: 3.2,
    ltir: 0.0,
    daysWithoutIncident: 178,
    compliancePercentage: 97,
    trainingCompletionRate: 92,
    activeCertifications: 31,
    expiringCertifications: 3,
  },
];

export const incidents: Incident[] = [
  {
    id: 'inc-001',
    companyId: 'central-oregon',
    locationId: 'loc-central-redmond',
    date: '2024-08-15',
    time: '14:30',
    type: 'injury',
    severity: 'moderate',
    employeeId: 'emp-004',
    description: 'Worker slipped on wet surface while carrying roofing materials, resulting in ankle sprain.',
    immediateCause: 'Slip on wet surface',
    bodyPartAffected: 'Left ankle',
    witnessIds: ['emp-003', 'emp-008'],
    reportedBy: 'emp-003',
    investigationStatus: 'completed',
    investigationDueDate: '2024-08-18',
    correctiveActions: [
      {
        id: 'ca-001',
        description: 'Implement wet surface protocol and additional warning signage',
        assignedTo: 'emp-003',
        dueDate: '2024-08-20',
        status: 'completed',
        completedDate: '2024-08-19',
      },
      {
        id: 'ca-002',
        description: 'Conduct toolbox talk on slip hazard awareness',
        assignedTo: 'emp-003',
        dueDate: '2024-08-22',
        status: 'completed',
        completedDate: '2024-08-21',
      },
    ],
  },
  {
    id: 'inc-002',
    companyId: 'palmer-roofing',
    locationId: 'loc-palmer-pendleton',
    date: '2024-06-22',
    time: '10:15',
    type: 'near_miss',
    severity: 'serious',
    employeeId: 'emp-006',
    description: 'Ladder shifted during climb due to unstable ground. Worker was able to stabilize before fall occurred.',
    immediateCause: 'Unstable ladder placement',
    witnessIds: ['emp-005'],
    reportedBy: 'emp-006',
    investigationStatus: 'completed',
    investigationDueDate: '2024-06-25',
    correctiveActions: [
      {
        id: 'ca-003',
        description: 'Reinforce ladder setup procedures in daily briefings',
        assignedTo: 'emp-005',
        dueDate: '2024-06-24',
        status: 'completed',
        completedDate: '2024-06-24',
      },
      {
        id: 'ca-004',
        description: 'Provide additional ladder stabilizer equipment',
        assignedTo: 'emp-005',
        dueDate: '2024-06-30',
        status: 'completed',
        completedDate: '2024-06-28',
      },
    ],
  },
  {
    id: 'inc-003',
    companyId: 'eagle-roofing',
    locationId: 'loc-eagle-bend',
    date: '2024-09-30',
    time: '11:45',
    type: 'near_miss',
    severity: 'minor',
    employeeId: 'emp-007',
    description: 'Nail gun misfired, narrowly missing another worker. Safety glasses prevented eye injury.',
    immediateCause: 'Equipment malfunction',
    witnessIds: ['emp-001', 'emp-002'],
    reportedBy: 'emp-001',
    investigationStatus: 'completed',
    investigationDueDate: '2024-10-03',
    correctiveActions: [
      {
        id: 'ca-005',
        description: 'Remove nail gun from service and inspect',
        assignedTo: 'emp-001',
        dueDate: '2024-09-30',
        status: 'completed',
        completedDate: '2024-09-30',
      },
      {
        id: 'ca-006',
        description: 'Implement daily equipment inspection checklist',
        assignedTo: 'emp-001',
        dueDate: '2024-10-05',
        status: 'completed',
        completedDate: '2024-10-04',
      },
    ],
  },
];

export const safetyAlerts: SafetyAlert[] = [
  {
    id: 'alert-001',
    priority: 'critical',
    type: 'training',
    title: 'Certifications Expiring Within 30 Days',
    message: '2 employees have critical certifications expiring soon. Immediate action required.',
    createdAt: new Date().toISOString(),
    actionRequired: true,
    read: false,
  },
  {
    id: 'alert-002',
    companyId: 'central-oregon',
    priority: 'high',
    type: 'weather',
    title: 'High Wind Warning - Central Oregon',
    message: 'Sustained winds forecasted to exceed 25 mph tomorrow. Consider work suspension protocols.',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    expiresAt: new Date(Date.now() + 86400000).toISOString(),
    actionRequired: true,
    read: false,
  },
  {
    id: 'alert-003',
    priority: 'medium',
    type: 'regulatory',
    title: 'New OSHA Guidance Released',
    message: 'Updated fall protection guidance for steep-pitch roofing operations available.',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    actionRequired: false,
    read: true,
  },
  {
    id: 'alert-004',
    companyId: 'palmer-roofing',
    priority: 'high',
    type: 'compliance',
    title: 'Quarterly Safety Audit Due',
    message: 'Q4 safety audit for Palmer Roofing locations due by November 30th.',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    expiresAt: new Date(Date.now() + 1209600000).toISOString(),
    actionRequired: true,
    read: false,
  },
  {
    id: 'alert-005',
    priority: 'low',
    type: 'training',
    title: 'New Toolbox Talk Available',
    message: 'Winter weather safety toolbox talk added to library.',
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    actionRequired: false,
    read: true,
  },
];

export const safetyArticles: SafetyArticle[] = [
  {
    id: 'article-001',
    title: 'Understanding OSHA Fall Protection Requirements for Roofing',
    slug: 'understanding-osha-fall-protection-requirements',
    category: 'Fall Protection',
    excerpt: 'Comprehensive guide to federal, Oregon, and Washington fall protection standards for roofing operations.',
    content: `
# Understanding OSHA Fall Protection Requirements for Roofing

## Bottom Line Up Front (BLUF)

Fall protection is REQUIRED at 6 feet or more in Oregon and federally, and at 4 feet for steep-pitch roofs in Washington. Falls remain the #1 cause of roofing fatalities (82% in 2023). Employers must provide appropriate fall protection systems and ensure workers are trained and using them correctly.

## Context and Background

The roofing industry continues to face the highest fall-related fatality rates in construction. In 2023, 110 of 134 roofing deaths were fall-related. Recent OSHA enforcement in Oregon and Washington shows fines ranging from $39,000 to $4+ million for repeat violations.

Federal OSHA requires fall protection at 6 feet for general construction work, including roofing. However, state plans in Oregon and Washington have specific requirements that may be more stringent.

## Requirements and Standards

### Federal OSHA (29 CFR 1926.501)

**Low-Slope Roofs (4:12 pitch or less):**
- Guardrail systems
- Safety net systems
- Personal fall arrest systems (PFAS)
- Warning line system (6 ft from edge) + additional protection
- Safety monitoring system (roofs ≤50 feet wide only)

**Steep Roofs (greater than 4:12 pitch):**
- Guardrail systems WITH toeboards (REQUIRED), OR
- Safety net systems, OR
- Personal fall arrest systems
- ⚠️ WARNING: Warning lines and safety monitors NOT PERMITTED on steep roofs

### Oregon OSHA State-Specific Requirements

**Trigger Height:** 6 feet (changed from 10 feet in October 2017)

**Prohibited Equipment:**
- Slide guard systems as PRIMARY fall protection (banned October 2017)
- Body belts for fall arrest (may use for fall restraint only)

**Safety Monitoring Systems:**
- ONLY permitted on roofs with slopes ≤2:12
- Cannot be used alone on roofs >50 feet wide
- Monitor must be a competent person

**Fall Protection Work Plan:**
- REQUIRED for work at 10+ feet
- Must identify hazards, methods, procedures, and rescue plan

### Washington State L&I/WISHA Requirements

**Trigger Heights (MORE STRINGENT):**
- Steep-pitched roofs (>4:12): **4 FEET** (vs. 6 feet federal)
- Low-pitched roofs (construction): 6 feet (updated November 2022)

**Safety Watch System (Washington-Specific):**
- Permitted for repair/servicing equipment on low-pitch roofs
- Maximum 2 people on roof (worker + safety watch)
- Must stay 6+ feet from edge
- Infrequent work only
- No federal equivalent

## Personal Fall Arrest System Requirements

All three jurisdictions require:

1. **Full-body harness** (body belts NOT acceptable for fall arrest)
2. **Anchorage:** 5,000 lbs per attached worker OR 2:1 safety factor certified by qualified person
3. **Maximum free fall:** 6 feet
4. **D-ring attachment:** Centered between shoulder blades
5. **Inspection:** BEFORE EACH USE for wear, damage, deterioration
6. **Rescue plan:** Written procedure REQUIRED

### Fall Clearance Calculation

CRITICAL: Calculate total fall clearance distance to prevent ground contact:

**Formula:**
Free fall distance + Deceleration distance + D-ring slide + Worker height + Safety margin

**Example:**
- 6 ft (free fall) + 3.5 ft (shock absorber deployment) + 1 ft (D-ring slide) + 6 ft (worker) + 3 ft (safety) = **19.5 feet minimum height**

## Common Violations and How to Avoid Them

### #1: Equipment Provided But Not Used (60%+ of citations)

**Problem:** Worker has harness but isn't connected to anchor point.

**Solution:**
- Competent person on site actively supervising
- Stop work authority for all employees
- Daily inspection and verification
- Disciplinary policy consistently enforced

### #2: Inadequate Anchorage

**Problem:** Anchor points don't meet 5,000 lb requirement.

**Solution:**
- Use engineered anchor points
- Have qualified person certify anchorages
- Document calculations and ratings
- Inspect anchors before each use

### #3: Insufficient Fall Clearance

**Problem:** Worker would hit ground/lower level before fall arrest system fully deploys.

**Solution:**
- Calculate fall clearance for every setup
- Use self-retracting lifelines when needed
- Adjust anchor point height
- Document calculations

## Recent Enforcement Examples

**Oregon (2024):**
- View Top Construction: $135,407 (3rd repeat - harness not connected)
- JAM Construction: $103,438 (3rd repeat - no fall protection)
- J&K Roofing: $39,000 (4th citation since 2021)

**Washington (2024):**
- Allways Roofing: $4.1 million total (including $345,700 in June)
- Valentine Roofing: $207,000 (safety lines too long)
- DR Horton: $132,000 (subcontractor violations)

**Pattern:** Repeat violators face exponentially higher penalties (200-300% increase per repeat).

## Step-by-Step Implementation

### 1. Assess Workplace (BEFORE work begins)
☐ Measure roof height
☐ Determine roof pitch (use pitch gauge)
☐ Identify edge protection needs
☐ Evaluate structural integrity for anchors
☐ Calculate fall clearance distances

### 2. Select Appropriate System
☐ Steep roof (>4:12) in WA: Fall protection at 4+ feet (no warning lines)
☐ Steep roof elsewhere: Fall protection at 6+ feet (no warning lines)
☐ Low-slope roof: Choose from approved systems based on conditions
☐ Verify system meets federal + state requirements

### 3. Install/Verify Equipment
☐ Inspect all equipment before use
☐ Verify anchorages rated for 5,000 lbs per worker
☐ Position anchors to minimize free fall
☐ Ensure fall clearance is adequate
☐ Install guardrails to specifications (39-45" top rail)

### 4. Train Workers
☐ Conduct fall protection training by competent person
☐ Cover nature of hazards, procedures, equipment use
☐ Demonstrate proper harness donning and connection
☐ Practice rescue procedures
☐ Document training with name, date, signature

### 5. Supervise and Enforce
☐ Assign competent person to supervise
☐ Conduct daily pre-job briefing
☐ Verify 100% connection at all times
☐ Stop work immediately if non-compliance observed
☐ Document compliance daily

## Documentation Requirements

**Fall Protection Work Plan (10+ feet in OR/WA):**
- Hazard identification
- Fall protection method selected
- Installation procedures
- Rescue procedures
- Competent person designation

**Training Certifications:**
- Employee name and signature
- Training date(s)
- Trainer name and signature
- Topics covered
- Retain for duration of employment + 1 year

**Equipment Inspections:**
- Daily inspection logs
- Defective equipment removal tags
- Annual certification for systems
- Manufacturer inspection schedules

## Resources and References

**OSHA Standards:**
- 29 CFR 1926.501 (Fall Protection Requirements)
- 29 CFR 1926.502 (Fall Protection Systems Criteria)
- 29 CFR 1926.503 (Fall Protection Training)

**Oregon OSHA:**
- OAR 437-003-0501 (Fall Protection)
- Oregon OSHA Publications: oregonosha.oregon.gov

**Washington L&I:**
- WAC 296-155-24609 (Fall Protection for Steep Roofs)
- WAC 296-155 Part J (Fall Protection)
- lni.wa.gov/safety-health

**Industry Resources:**
- NRCA Fall Protection Guide: nrca.net
- OSHA Fall Prevention Campaign: osha.gov/stop-falls

## Key Takeaways

1. **Know your trigger heights:** 6 ft (federal/Oregon), 4 ft (Washington steep roofs)
2. **Steep roofs = stricter rules:** Warning lines and safety monitors NOT permitted
3. **Calculate fall clearance:** Don't assume—do the math every time
4. **Training documentation is critical:** OSHA will ask for proof
5. **Competent person supervision is mandatory:** Not just providing equipment—ensuring it's used
6. **State requirements can be more stringent:** Always comply with the most protective standard
7. **Repeat violations = exponential penalties:** First time $40K → Fourth time $135K+

**Remember:** Fall protection is a requirement, not an option. The cost of compliance is always less than the cost of a serious injury or fatality.
    `,
    author: 'Sandra Casey',
    publishedDate: '2024-11-01',
    readTime: 12,
    tags: ['Fall Protection', 'OSHA Compliance', 'Oregon', 'Washington', 'Steep Roofs'],
    relatedArticles: ['article-002', 'article-003', 'article-004'],
  },
  {
    id: 'article-002',
    title: 'Personal Fall Arrest Systems: Complete Guide',
    slug: 'personal-fall-arrest-systems-complete-guide',
    category: 'Fall Protection',
    excerpt: 'Everything you need to know about PFAS: selection, fitting, inspection, and proper use.',
    content: `
# Personal Fall Arrest Systems: Complete Guide

## Bottom Line Up Front

Personal Fall Arrest Systems (PFAS) are the most common fall protection method in roofing. A PFAS has three components: full-body harness, connecting device (lanyard or lifeline), and anchorage. All three must be properly selected, inspected before each use, and correctly used to prevent falls from height.

## What is a Personal Fall Arrest System?

A PFAS is designed to safely stop a fall that has already begun. When properly used, it arrests (stops) a fall before the worker hits the ground or a lower level.

**Critical Distinction:**
- **Fall ARREST**: Stops a fall in progress (requires shock absorption)
- **Fall RESTRAINT**: Prevents worker from reaching fall hazard (no shock absorber needed)

## PFAS Components

### 1. Full-Body Harness

**Requirements:**
- Must distribute fall arrest forces over thighs, pelvis, chest, shoulders
- D-ring attachment point centered between shoulder blades
- Chest and front D-rings for positioning, NOT fall arrest
- Must fit properly with all straps adjusted snugly

**Common Harness Types:**
- Class II: Chest and dorsal (back) D-rings - MINIMUM for fall arrest
- Class III: Full-body with multiple D-rings - RECOMMENDED for roofing
- Positioning harnesses: Waist belts - NOT acceptable for fall arrest

**Proper Fit:**
- Shoulder straps adjusted to position dorsal D-ring between shoulder blades
- Leg straps snug but not restrictive
- No loose or twisted straps
- Can fit fist between harness and body (not tighter, not looser)
- Adjustment points within labeled range

### 2. Connecting Device

**Shock-Absorbing Lanyard:**
- Fixed length (typically 6 feet)
- Integral shock absorber (tears/deploys to reduce forces to <900 lbs)
- Double-leg lanyards allow 100% tie-off when moving between anchors
- Inspect for tears, cuts, abrasion, burns

**Self-Retracting Lifeline (SRL):**
- Automatically extends/retracts like seatbelt
- Locks immediately when fall detected
- Reduced free fall distance (typically 2 feet vs. 6 feet)
- Ideal for low-clearance situations
- More expensive but safer

**Vertical Lifeline:**
- Rope or cable anchored above work area
- Requires rope grab or mobile fall arrester
- Worker climbs with device, which locks during fall
- Good for ladder climbing, vertical work

**Horizontal Lifeline:**
- Cable or rope between two anchors
- Allows lateral movement across roof
- Must be engineered (sag increases forces significantly)
- Requires intermediate supports for spans >50 feet

### 3. Anchorage/Anchor Point

**Critical Requirements:**
- **5,000 pounds per attached worker** (OSHA standard), OR
- **2:1 safety factor** certified by qualified person (e.g., 3,000 lb anchor supporting max 1,500 lb force)

**Common Anchor Types:**

*Structural Anchors:*
- Steel beams/columns
- Roof trusses (if rated by engineer)
- Parapet walls (if engineered)

*Engineered Anchor Points:*
- Permanent roof anchors (installed per manufacturer)
- Temporary anchorages (tripods, davits)
- Mobile anchors (counterweighted systems)

*Questionable Anchors (require engineering):*
- Chimneys (may not be structural)
- Vent pipes (typically NOT adequate)
- HVAC units (typically NOT adequate)
- Skylights (typically NOT adequate)

**Anchor Positioning:**
- At or above D-ring level (reduces free fall)
- Directly above worker when possible (reduces swing fall)
- Consider pendulum effect if anchor is off to side

## Fall Clearance Calculation

**YOU MUST CALCULATE FALL CLEARANCE TO PREVENT GROUND IMPACT.**

### Formula:
\`\`\`
Total Fall Clearance = Free Fall Distance + Deceleration Distance +
                       D-ring Slide + Worker Height + Safety Margin
\`\`\`

### Example Calculation:

Scenario: 6-foot shock-absorbing lanyard, 6-foot tall worker, anchor at foot level

- **Free fall distance:** 6 feet (lanyard length)
- **Deceleration distance:** 3.5 feet (shock absorber deployment)
- **D-ring slide:** 1 foot (distance from anchor to D-ring when fallen)
- **Worker height:** 6 feet (top of head to feet)
- **Safety margin:** 3 feet (buffer)

**TOTAL: 19.5 feet minimum working height required**

### Reducing Required Clearance:

- Use self-retracting lifeline (reduces free fall to ~2 feet)
- Position anchor ABOVE worker (reduces free fall)
- Use shorter lanyard if possible
- Work from aerial lift or scaffolding (higher surface)

## Inspection Procedures

### Before Each Use (Daily Minimum):

**Harness:**
☐ Check all webbing for cuts, tears, abrasion, burns, chemical damage
☐ Inspect stitching (red warning stitches visible = REMOVE FROM SERVICE)
☐ Check all D-rings, buckles, grommets for cracks, distortion, sharp edges
☐ Ensure all adjustments are secure
☐ Check manufacturer labels are present and legible
☐ Verify harness is not past expiration date

**Lanyard/Lifeline:**
☐ Inspect rope/webbing for cuts, fraying, abrasion, discoloration
☐ Check shock absorber pack is intact (if torn/deployed = REMOVE FROM SERVICE)
☐ Inspect snaphooks for cracks, distortion, proper closure, locking mechanism
☐ Check for corrosion, sharp edges, burrs
☐ Verify lanyard is not past expiration date

**Anchor:**
☐ Verify anchor is rated for 5,000 lbs or certified by engineer
☐ Check for damage, corrosion, looseness
☐ Ensure anchor is properly installed and secure
☐ Verify location provides adequate fall clearance

### When to Remove from Service:

- Any visible damage (cuts, tears, abrasion, burns)
- Shock absorber deployed or pack torn
- Missing labels or illegible markings
- Cracks in metal components
- Distorted or bent parts
- Chemical exposure or UV degradation
- Involved in fall arrest (MUST remove entire system)
- Past manufacturer expiration date (typically 5 years from manufacture)

**NEVER repair damaged fall protection equipment. Destroy and replace.**

## Proper Use Procedures

### 1. Donning the Harness

1. Hold harness by dorsal D-ring, shake to orient straps
2. Unbuckle all connections
3. Place arms through shoulder straps
4. Pull leg straps between legs and connect to hip attachment
5. Connect chest strap (if equipped)
6. Adjust shoulder straps so D-ring is between shoulder blades
7. Adjust leg straps so snug but not restrictive
8. Ensure no twisted straps
9. Have partner verify fit and D-ring position

### 2. Connecting to Anchor

1. Inspect harness, lanyard, anchor before connection
2. Verify adequate fall clearance
3. Attach lanyard to dorsal D-ring (never side or front for fall arrest)
4. Connect snaphook to anchor point
5. Ensure snaphook gate closes and locks completely
6. Keep lanyard as short as practical (reduces free fall)
7. Avoid working above anchor when possible

### 3. During Work

- Stay connected 100% of time when exposed to fall hazard
- Use double-leg lanyard for 100% tie-off when moving
- Avoid sharp edges that could cut lanyard
- Don't wrap lanyard around anchor (creates sharp bend)
- Monitor lanyard for tangles or obstructions
- Reposition if anchor moves behind you (avoid swing fall)

### 4. Common Mistakes to Avoid

❌ Connecting to front or side D-ring for fall arrest
❌ Connecting snaphook back to lanyard (creates small loop, increases forces)
❌ Using anchor below D-ring level (increases free fall)
❌ Wrapping lanyard around sharp edges
❌ Working without 100% tie-off
❌ Using body belt for fall arrest
❌ Attaching multiple workers to single anchor (without engineering approval)

## Rescue Procedures

**OSHA REQUIRES a rescue plan BEFORE beginning work with PFAS.**

### Rescue Methods:

**Self-Rescue:**
- Descent devices allowing worker to lower themselves
- Requires training and practice
- Best option if worker is conscious and uninjured

**Assisted Rescue:**
- Co-worker using rescue equipment
- Mechanical advantage systems
- Aerial lift or ladder rescue

**Emergency Services:**
- Fire department with aerial equipment
- Time-critical (suspension trauma can be fatal in <30 min)
- Must have site access and equipment to reach worker

### Suspension Trauma:

Hanging motionless in harness can cause blood to pool in legs, leading to unconsciousness and death in as little as 10-20 minutes.

**Prevention:**
- Rescue worker within 6 minutes
- Relief straps allow worker to stand in harness
- Worker training on leg movement while suspended

## Training Requirements

**OSHA requires training BEFORE exposure to fall hazards (29 CFR 1926.503).**

### Topics Must Include:

- Nature of fall hazards in work area
- Correct procedures for erecting, maintaining, disassembling fall protection
- Proper construction, use, and limitations of PFAS
- How to don harness and adjust fit
- How to connect to anchor points
- Fall clearance calculations
- Inspection procedures
- Manufacturer instructions for equipment
- Rescue procedures including suspension trauma

**Written Certification Required:**
- Employee name and signature
- Date(s) of training
- Trainer name and qualifications
- Signature of trainer or employer representative

**Retraining Required When:**
- Changes in workplace render previous training obsolete
- Changes in type of fall protection used
- Employee demonstrates inadequate knowledge or use

## Documentation to Maintain

1. **Training certificates** (name, date, trainer signature)
2. **Daily inspection logs** (harness, lanyard, anchor checks)
3. **Equipment inventory** (purchase dates, expiration tracking)
4. **Fall protection work plan** (anchors, clearances, rescue plan)
5. **Incident reports** (if fall occurs, entire system removed and investigated)
6. **Manufacturer instructions** (for all equipment)

## Resources

- **OSHA 1926.502**: Fall Protection Systems Criteria and Practices
- **ANSI Z359 Series**: American National Standards for Fall Protection
- **Manufacturer Instructions**: ALWAYS follow for specific equipment
- **OSHA Fall Protection in Construction Guide**: Free download at osha.gov

## Key Takeaways

1. **Three components required:** Harness, connecting device, anchor (all must be rated and compatible)
2. **5,000 lbs per worker:** Anchor requirement is non-negotiable
3. **Inspect before EACH use:** Daily minimum, immediately remove damaged equipment
4. **Calculate fall clearance:** Math is required, not optional
5. **100% tie-off:** Must be connected whenever exposed to fall hazard
6. **Dorsal D-ring only:** Front/side D-rings NOT for fall arrest
7. **Rescue plan required:** Must be in place before work begins
8. **Training + documentation:** Both required, both enforced

**Your life depends on this equipment working correctly. Never compromise, never skip inspections, never work unprotected.**
    `,
    author: 'Sandra Casey',
    publishedDate: '2024-11-02',
    readTime: 15,
    tags: ['Fall Protection', 'PFAS', 'Harness', 'Safety Equipment', 'Training'],
    relatedArticles: ['article-001', 'article-003'],
  },
  {
    id: 'article-003',
    title: 'Ladder Safety: Avoiding the #2 Most Common Violation',
    slug: 'ladder-safety-avoiding-common-violations',
    category: 'Ladder Safety',
    excerpt: 'Ladder safety violations are the second most cited in roofing. Learn the 3-foot rule, proper setup, and inspection requirements.',
    content: `
# Ladder Safety: Avoiding the #2 Most Common Violation

## Bottom Line Up Front

Ladder-related violations are the #2 most cited OSHA violation in roofing, second only to fall protection. The most common violation is extension ladders not extending 3 feet above the upper landing. Proper ladder setup includes the 4:1 angle ratio, secure footing, and extending the side rails at least 3 feet above the roof edge.

## Why Ladder Safety Matters

Falls from ladders account for a significant percentage of roofing injuries. In 2023, ladder-related incidents contributed to dozens of serious injuries and fatalities. OSHA regulations (29 CFR 1926.1053) specify exact requirements for ladder use in construction.

## The 3-Foot Rule (Most Common Violation)

### Requirement:
**Extension ladder side rails MUST extend at least 3 feet above the upper landing surface.**

### Why:
- Provides handhold for mounting and dismounting
- Prevents falls while transitioning from ladder to roof
- Creates visual reference point for safe climbing

### How to Comply:
1. Position ladder so it reaches at least 3 feet above roof edge
2. Secure top of ladder to prevent slipping
3. Ensure 3 feet is above the SURFACE, not the gutter or eave
4. Use ladder tie-offs, standoffs, or stabilizer bars

### Enforcement:
Oregon and Washington both cite this violation regularly. Recent citations include penalties of $7,000-$15,000 per occurrence.

## The 4:1 Angle Rule

### Requirement:
**For every 4 feet of working length (vertical distance), the base must be 1 foot away from the wall.**

### Quick Check Method:
- Stand at base of ladder, toes touching bottom rung
- Extend arms straight ahead
- Palms should just touch ladder rung at shoulder height
- If you can't reach = too steep (will tip backward)
- If you must lean in = too shallow (will slip outward)

### Why It Matters:
- Too steep: Ladder can tip backward
- Too shallow: Base can slip outward
- Correct angle: Weight properly distributed, stable

## Complete Ladder Setup Procedure

### 1. Inspect Before Each Use

☐ **Rungs**: Check for cracks, splits, bends, excessive wear
☐ **Side rails**: Look for dents, bends, cracks, corrosion
☐ **Feet**: Verify non-slip feet are present and in good condition
☐ **Locking mechanisms**: Ensure rung locks engage properly
☐ **Rope and pulley**: Check for fraying, proper function (extension ladders)
☐ **Labels**: Verify load rating and safety labels are present
☐ **Cleanliness**: Remove mud, grease, or other slip hazards

**Remove from service if:** Any damage, defects, or missing components.

### 2. Choose Correct Ladder

**Type I (Industrial):** 250 lb capacity - Heavy-duty, recommended for roofing
**Type II (Commercial):** 225 lb capacity - Medium-duty
**Type III (Household):** 200 lb capacity - Light-duty, NOT for professional use

**Length:**
- Must reach at least 3 feet above upper landing
- Account for angle (vertical reach ≠ ladder length)
- Rule of thumb: For 20 ft roof height, use minimum 28 ft ladder

### 3. Position and Setup

☐ Place on firm, level surface
☐ Check for overhead power lines, wires, obstructions
☐ Set base 1/4 the working length away from wall (4:1 ratio)
☐ Ensure both feet are firmly planted on ground
☐ On soft ground, use ladder levelers or boards under feet
☐ Face ladder toward work area
☐ Extend at least 3 feet above upper landing

### 4. Secure the Ladder

☐ Tie off at top to secure anchor point, OR
☐ Use ladder stabilizer/standoff, OR
☐ Have co-worker foot (hold) the ladder while in use
☐ Never leave unsecured if someone is climbing
☐ In windy conditions, always tie off

### 5. Climbing Safely

☐ Maintain three points of contact (two hands + one foot, or two feet + one hand)
☐ Face the ladder while climbing
☐ Keep body centered between side rails
☐ Don't carry tools - use tool belt or hoist line
☐ One person on ladder at a time
☐ Don't climb above third rung from top
☐ Never stand on top cap/bucket shelf

### 6. Transitioning to/from Roof

☐ Grab ladder side rails (not rungs) when transitioning
☐ Keep three points of contact
☐ Step onto roof surface, not gutter or edge
☐ When descending, face ladder before stepping on
☐ Lower yourself carefully, don't jump to ladder

## Stepladder Safety

### Requirements:

☐ Fully open spreader bars locked in place
☐ All four feet on firm, level surface
☐ Never use as straight ladder (leaning against wall)
☐ Never climb above second step from top
☐ Never stand on top cap
☐ Always face the stepladder while working

### Common Stepladder Violations:

❌ Standing on top step (CITED FREQUENTLY)
❌ Leaning stepladder against wall
❌ Spreader bars not fully opened
❌ Overreaching while on stepladder

## Common Ladder Violations and How to Avoid

### #1: Extension Not 3 Feet Above Landing

**Violation:** Ladder ends at roof edge or less than 3 feet above.

**How to Avoid:**
- Measure before use
- Mark 3-foot point on ladder with bright tape
- Train workers on requirement
- Supervisors verify during daily inspections

### #2: Improper Angle

**Violation:** Ladder too steep or too shallow.

**How to Avoid:**
- Use 4:1 ratio every time
- Teach palm-check method
- Mark proper base position before raising ladder

### #3: Ladder Not Secured

**Violation:** Ladder can slip or shift during use.

**How to Avoid:**
- Tie off at top (preferred method)
- Use ladder stabilizers/standoffs
- Assign spotter to foot ladder
- Check stability before climbing

### #4: Using Damaged Ladder

**Violation:** Cracked rungs, bent rails, missing feet.

**How to Avoid:**
- Inspect before EACH use
- Tag defective ladders "DO NOT USE"
- Remove from service immediately
- Replace, never repair

### #5: Improper Climbing Technique

**Violation:** Carrying tools while climbing, not maintaining three points of contact.

**How to Avoid:**
- Use tool belts or hoist lines
- Train on three-point contact
- Take your time
- Supervisors model correct behavior

## Training Requirements

**OSHA requires ladder safety training for all workers who use ladders (29 CFR 1926.1060).**

### Must Cover:

- Nature of fall hazards when working on/around ladders
- Correct procedures for setup, use, and storage
- Maximum load capacity
- Industry and OSHA standards
- Inspection procedures

**Document with:** Name, date, topics covered, trainer signature

## Oregon and Washington Specific Requirements

**Oregon OSHA:**
- Same requirements as federal
- Aggressive enforcement of 3-foot rule
- Recent citations averaging $8,000-12,000

**Washington L&I:**
- Additional emphasis on portable ladder safety
- Requirements in WAC 296-876
- Ladder Clinics offered free by L&I

## Ladder Inspection Checklist

Use this daily checklist before each job:

**Extension Ladders:**
☐ Side rails straight, no bends or cracks
☐ Rungs secure, no cracks or excessive wear
☐ Rung locks function properly, engage fully
☐ Rope and pulley operate smoothly (if equipped)
☐ Safety feet present and in good condition
☐ Load capacity label present and legible
☐ Free from mud, grease, other slip hazards

**Stepladders:**
☐ Steps secure, no cracks or damage
☐ Spreader bars operate smoothly, lock securely
☐ All four feet present and in good condition
☐ Side rails straight, no damage
☐ No loose hinges or hardware
☐ Load capacity label present

**Remove from Service If:**
- Any structural damage (cracks, bends, splits)
- Missing or damaged safety feet
- Defective locks or locking mechanisms
- Missing load rating label
- Excessive wear or corrosion
- Repairs attempted (ladders cannot be repaired)

## Emergency Response

**If Ladder Fails While Worker is Climbing:**

1. Call for emergency medical services (911)
2. Provide first aid if trained
3. Secure area to prevent additional injuries
4. Preserve ladder and scene for investigation
5. Report to OSHA within required timeframe:
   - Fatality: 8 hours
   - Hospitalization: 24 hours
6. Investigate root cause before resuming work

## Storage and Maintenance

**Proper Storage:**
- Store horizontally on racks or wall brackets
- Support at multiple points (every 6 feet)
- Protect from weather exposure when possible
- Keep in dry, ventilated area
- Never store with heavy materials on top

**Maintenance:**
- Clean regularly to prevent corrosion
- Check moving parts, lubricate if needed
- Tighten loose hardware
- Never paint wooden ladders (hides defects)
- Replace worn parts with manufacturer-approved components

## Resources

- **OSHA 1926.1053**: Ladders (Construction Standards)
- **OSHA 1926.1060**: Training Requirements
- **ANSI ASC A14**: American Ladder Institute Standards
- **Oregon OSHA**: Ladder Safety Resources at oregonosha.oregon.gov
- **Washington L&I**: Free Ladder Safety Clinics at lni.wa.gov

## Key Takeaways

1. **3-foot rule is #1 citation:** Extension ladders MUST extend 3 feet above landing
2. **4:1 angle ratio:** Base distance = 1/4 working length
3. **Inspect before EACH use:** Daily minimum, remove damaged ladders immediately
4. **Secure the ladder:** Tie off, use stabilizers, or assign spotter
5. **Three points of contact:** Always while climbing or working
6. **Proper transition:** Grab side rails when mounting/dismounting
7. **One person at a time:** Never have multiple workers on same ladder
8. **Training required:** Must document with name, date, signature

**Ladder safety is fundamental:** Most violations are easily preventable with proper training and supervision. Make it a habit, not an afterthought.
    `,
    author: 'Sandra Casey',
    publishedDate: '2024-11-03',
    readTime: 10,
    tags: ['Ladder Safety', 'OSHA Compliance', 'Fall Prevention', 'Training'],
    relatedArticles: ['article-001', 'article-002'],
  },
];
