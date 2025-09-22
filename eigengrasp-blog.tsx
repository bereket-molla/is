'use client';

import BlogHeader from '@/components/BlogHeader';
import BlogContainer from '@/components/BlogContainer';
import SectionHeading from '@/components/SectionHeading';
import { Paragraph, Link, Strong, Emphasis, Separator } from '@/components/Typography';
import { MathInline, MathBlock, Table, Figure } from '@/components/MathAndTables';
import SimpleCodeBlock, { InlineCode } from '@/components/SimpleCodeBlock';
import CustomList from '@/components/CustomList';
import HandwrittenLabel from '@/components/HandwrittenLabel';
import Annotations from '@/components/Annotations';

export default function EigenGraspBlog() {
  return (
    <BlogContainer>
      <BlogHeader
        date="December 2024"
        title="One Dial, Many Joints: Why Linear Works for a Pinch (and What Autoencoders Add)"
        subtitle="From a Robot Learning lecture to understanding the geometry of grasping"
        meta="A deep dive into EigenGrasps, constraint manifolds, and why PCA captures grasp synergies so well"
      />

      {/* Section 0: Opening */}
      <SectionHeading level={2} id="opening">
        The moment this clicked in Robot Learning
      </SectionHeading>
      
      <Paragraph>
        It was a Thursday afternoon in Matei Ciocarlie's Robot Learning class when he introduced 
        <Strong> EigenGrasps</Strong>—a deceptively simple idea: control a complex robotic hand with 
        many joints using just a few "dials" or synergies. The math was straightforward (just PCA on 
        joint angles), but the <Emphasis>why</Emphasis> kept nagging at me.
      </Paragraph>

      <Paragraph>
        I dove into the original paper that evening. The results were impressive—hands with 20+ degrees 
        of freedom controlled effectively with 2-3 parameters. But I left with a precise question that 
        wouldn't let go: <Strong>Why should a linear model fit grasp postures so well?</Strong>
      </Paragraph>

      <Paragraph>
        This blog is my answer to that question. We'll work through it with a concrete example—a 
        simple two-finger pinch—and discover why the physics of grasping <Emphasis>forces</Emphasis> 
        local linearity, making PCA not just convenient but geometrically natural.
      </Paragraph>

      <Figure 
        alt="Single dial controlling multiple joint sliders" 
        caption="The core idea: one 'synergy dial' drives multiple joints in coordinated patterns"
      />

      <Separator />

      {/* Section 1: EigenGrasps */}
      <SectionHeading level={2} id="eigengrasps">
        EigenGrasps: from many joints to a few synergies
      </SectionHeading>

      <Paragraph>
        Let's start with what EigenGrasps actually does, stripped of any mystique. You have a robotic 
        hand with <MathInline>n</MathInline> joint angles collected in a vector <MathInline>q \in \mathbb{R}^n</MathInline>. 
        The problem: <MathInline>n</MathInline> might be 20 or more, making direct control unwieldy.
      </Paragraph>

      <Paragraph>
        The EigenGrasp solution is beautifully simple:
      </Paragraph>

      <CustomList type="ordered">
        <li>Collect many example grasp postures <MathInline>\{q^{(1)}, q^{(2)}, ..., q^{(m)}\}</MathInline></li>
        <li>Run PCA on these joint angles to find principal components</li>
        <li>Keep only the top <MathInline>k</MathInline> components (typically 2-4)</li>
        <li>Use these as "synergy dials" to generate new grasps</li>
      </CustomList>

      <Paragraph>
        <Strong>The math behind it:</Strong> Given mean-centered data matrix <MathInline>X \in \mathbb{R}^{m \times n}</MathInline> 
        where each row is a centered posture, we compute the covariance:
      </Paragraph>

      <MathBlock>
        \Sigma = \frac{1}{m} X^T X
      </MathBlock>

      <Paragraph>
        The top <MathInline>k</MathInline> eigenvectors of <MathInline>\Sigma</MathInline> form a matrix 
        <MathInline> U \in \mathbb{R}^{n \times k}</MathInline>. These are the <Strong>eigen-grasps</Strong>.
      </Paragraph>

      <Paragraph>
        To encode a posture: <MathInline>z = U^T (q - \mu)</MathInline> where <MathInline>\mu</MathInline> is 
        the mean posture. This gives us <MathInline>k</MathInline> coefficients.
      </Paragraph>

      <Paragraph>
        To decode back: <MathInline>\hat{q} = \mu + Uz</MathInline>. We've reduced control from 
        <MathInline> n</MathInline> dimensions to just <MathInline>k</MathInline>.
      </Paragraph>

      <Figure 
        alt="Joint cloud with EigenGrasp subspace" 
        caption="The cloud of joint configurations with the low-dimensional EigenGrasp subspace (plane or line) fitted through it"
      />

      <Separator />

      {/* Section 2: What is a grasp? */}
      <SectionHeading level={2} id="grasp-definition">
        What is a grasp? (definition → constraints → math representation)
      </SectionHeading>

      <Paragraph>
        Before diving deeper, we need to be precise about what constitutes a "grasp." It's not just 
        fingers touching an object—it's a configuration that satisfies specific physical constraints.
      </Paragraph>

      <Paragraph>
        <Strong>A grasp is a hand configuration where:</Strong>
      </Paragraph>

      <CustomList type="unordered">
        <li>Fingertips maintain contact with the object</li>
        <li>Contact forces lie within friction cones (no slipping)</li>
        <li>The object is in equilibrium (or controlled motion)</li>
      </CustomList>

      <Paragraph>
        These requirements translate into two families of constraints:
      </Paragraph>

      <SectionHeading level={3} id="kinematic-constraints">
        Kinematic Constraints
      </SectionHeading>

      <Paragraph>
        These govern the <Emphasis>motion</Emphasis> aspect:
      </Paragraph>

      <CustomList type="unordered">
        <li><Strong>Contact maintenance:</Strong> Fingertips stay on the object surface</li>
        <li><Strong>Contact mode:</Strong> Either stick (no relative motion) or slide/roll (tangential motion allowed)</li>
        <li><Strong>Non-interpenetration:</Strong> Fingers don't pass through the object</li>
      </CustomList>

      <Paragraph>
        Mathematically, with posture <MathInline>q \in \mathbb{R}^n</MathInline> and fingertip positions 
        <MathInline> p_i(q) \in \mathbb{R}^d</MathInline> (smooth functions of joint angles), we encode 
        "maintaining the grasp" as:
      </Paragraph>

      <MathBlock>
        h(q) = 0
      </MathBlock>

      <Paragraph>
        where <MathInline>h</MathInline> captures all contact constraints. When we make small changes 
        <MathInline> \delta q</MathInline> to the posture, linearization gives us:
      </Paragraph>

      <MathBlock>
        J_h(q^*) \delta q = 0
      </MathBlock>

      <Paragraph>
        The <Strong>key insight:</Strong> The allowed instantaneous motions (that don't break the grasp) 
        form the nullspace <MathInline>\mathcal{N}(J_h)</MathInline>—a <Emphasis>linear subspace</Emphasis>.
      </Paragraph>

      <SectionHeading level={3} id="force-constraints">
        Force Constraints
      </SectionHeading>

      <Paragraph>
        These govern the <Emphasis>force</Emphasis> aspect:
      </Paragraph>

      <CustomList type="unordered">
        <li><Strong>Friction cones:</Strong> Contact forces must lie within Coulomb friction limits</li>
        <li><Strong>Equilibrium:</Strong> Net wrench (force + torque) on object equals desired value (often zero)</li>
        <li><Strong>Internal forces:</Strong> Can "squeeze" without net object motion</li>
      </CustomList>

      <Figure 
        alt="Hand and object with constraint bubbles" 
        caption="A grasp satisfies both motion constraints (maintaining contact) and force constraints (friction cones, equilibrium)"
      />

      <Separator />

      {/* Section 3: The simple setting */}
      <SectionHeading level={2} id="simple-setting">
        The small, honest setting you'll use throughout
      </SectionHeading>

      <Paragraph>
        To make everything concrete and visual, let's work with the simplest non-trivial example: 
        two planar fingers, each with two joints, pinching a thin object.
      </Paragraph>

      <Paragraph>
        Our setup:
      </Paragraph>

      <CustomList type="unordered">
        <li>Four joint angles total: <MathInline>q = [q_1, q_2, q_3, q_4]^T</MathInline></li>
        <li>Left fingertip position: <MathInline>p_L(q_1, q_2)</MathInline></li>
        <li>Right fingertip position: <MathInline>p_R(q_3, q_4)</MathInline></li>
        <li>Jacobians <MathInline>J_L</MathInline> and <MathInline>J_R</MathInline> map joint velocities to tip velocities</li>
      </CustomList>

      <Paragraph>
        Think of it as two simple 2-link arms facing each other with a business card between them. 
        This is rich enough to show all the key phenomena but simple enough to visualize and compute.
      </Paragraph>

      <Figure 
        alt="Two 2-link fingers facing a thin card" 
        caption="Our model system: two planar fingers (2 DOF each) pinching a thin object"
      />

      <SimpleCodeBlock showLineNumbers>
{`# Our configuration space
q = [q1, q2, q3, q4]  # 4 joint angles

# Forward kinematics (simplified)
p_L = f_left(q1, q2)   # Left fingertip position
p_R = f_right(q3, q4)  # Right fingertip position

# Jacobians relate joint velocities to tip velocities
J_L = ∂p_L/∂[q1, q2]   # 2x2 matrix
J_R = ∂p_R/∂[q3, q4]   # 2x2 matrix`}
      </SimpleCodeBlock>

      {/* Continue with remaining sections... */}
      
      <Paragraph style={{ marginTop: '3rem', padding: '2rem', background: 'var(--base2)', borderRadius: '8px' }}>
        <Strong>Note:</Strong> This is the beginning of the comprehensive blog post. The full post would 
        continue with all 16 sections from your outline, including the mathematical derivations, 
        figures, appendices, and glossary. Would you like me to continue with specific sections or 
        adjust the style/level of detail?
      </Paragraph>

    </BlogContainer>
  );
}
