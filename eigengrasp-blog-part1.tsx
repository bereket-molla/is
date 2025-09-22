'use client';

import BlogHeader from '@/components/BlogHeader';
import BlogContainer from '@/components/BlogContainer';
import SectionHeading from '@/components/SectionHeading';
import { Paragraph, Link, Strong, Emphasis, Separator } from '@/components/Typography';
import { MathInline, MathBlock, Table, Figure } from '@/components/MathAndTables';
import SimpleCodeBlock, { InlineCode } from '@/components/SimpleCodeBlock';
import CustomList from '@/components/CustomList';
import { JointSlider, SliderControls } from '@/components/SliderControls';
import HandwrittenLabel from '@/components/HandwrittenLabel';

export default function EigenGraspBlogPart1() {
  return (
    <BlogContainer>
      <BlogHeader
        date="December 2024"
        title="One Dial, Many Joints: Why Linear Works for a Pinch"
        subtitle="Part 1: Constraint Geometry and Local Linearity"
        meta="Understanding how physics creates low-dimensional structure in grasping"
      />

      <SectionHeading level={2} id="introduction">
        Setting the context
      </SectionHeading>
      
      <Paragraph>
        In Matei Ciocarlie's Robot Learning class at Columbia, we covered EigenGrasps—a method for 
        controlling robotic hands with many joints using just a few parameters. The technique is 
        straightforward: collect grasp examples, apply PCA to the joint angles, and use the top 
        principal components as control parameters. The dimensionality reduction is significant—hands 
        with 20+ degrees of freedom can be controlled effectively with 2-3 parameters.
      </Paragraph>

      <Paragraph>
        The empirical results are well-documented. Santello et al. (1998) showed that human hand 
        postures during grasping could be captured with 2-3 principal components accounting for over 
        80% of the variance. Ciocarlie and Allen (2009) demonstrated similar results for robotic hands. 
        Yet the underlying question remains: why should linear dimensionality reduction work well for 
        something as complex as grasping?
      </Paragraph>

      <Paragraph>
        This analysis addresses that question using a simple two-finger pinch as the primary example. 
        We'll show that the constraints of maintaining contact create low-dimensional manifolds in 
        configuration space that are locally linear. This local linearity makes PCA not just convenient 
        but geometrically appropriate for capturing grasp synergies.
      </Paragraph>

      <Figure 
        alt="Single parameter controlling multiple joint angles" 
        caption="Figure 1: Conceptual diagram of synergy control—one parameter drives multiple joints in coordinated patterns"
      />

      <Separator />

      <SectionHeading level={2} id="eigengrasps-overview">
        EigenGrasps: The technical approach
      </SectionHeading>

      <Paragraph>
        Consider a robotic hand with <MathInline>n</MathInline> joints, where each configuration is 
        described by a vector <MathInline>\mathbf{q} \in \mathbb{R}^n</MathInline>. For a typical 
        robotic hand, <MathInline>n</MathInline> ranges from 12 to 24. Direct control of all these 
        joints independently is computationally expensive and often unnecessary.
      </Paragraph>

      <Paragraph>
        The EigenGrasp approach exploits correlations in joint movements during grasping. The algorithm 
        follows these steps:
      </Paragraph>

      <CustomList type="ordered">
        <li>Collect <MathInline>m</MathInline> grasp examples <MathInline>\{\mathbf{q}^{(1)}, \mathbf{q}^{(2)}, ..., \mathbf{q}^{(m)}\}</MathInline></li>
        <li>Compute the mean posture <MathInline>\boldsymbol{\mu} = \frac{1}{m}\sum_{i=1}^m \mathbf{q}^{(i)}</MathInline></li>
        <li>Form the mean-centered data matrix <MathInline>\mathbf{X} \in \mathbb{R}^{m \times n}</MathInline></li>
        <li>Compute the covariance matrix <MathInline>\boldsymbol{\Sigma} = \frac{1}{m}\mathbf{X}^T\mathbf{X}</MathInline></li>
        <li>Extract the top <MathInline>k</MathInline> eigenvectors of <MathInline>\boldsymbol{\Sigma}</MathInline></li>
      </CustomList>

      <Paragraph>
        The eigenvectors form a matrix <MathInline>\mathbf{U} \in \mathbb{R}^{n \times k}</MathInline> 
        where <MathInline>k \ll n</MathInline>. These columns are the eigen-grasps—the principal modes 
        of variation in the grasp data.
      </Paragraph>

      <Paragraph>
        Encoding a posture into the reduced space:
      </Paragraph>
      <MathBlock>
        \mathbf{z} = \mathbf{U}^T (\mathbf{q} - \boldsymbol{\mu})
      </MathBlock>

      <Paragraph>
        Decoding from the reduced representation:
      </Paragraph>
      <MathBlock>
        \hat{\mathbf{q}} = \boldsymbol{\mu} + \mathbf{U}\mathbf{z}
      </MathBlock>

      <Paragraph>
        This transformation reduces control from <MathInline>n</MathInline> dimensions to 
        <MathInline>k</MathInline> dimensions, typically achieving a 5-10x reduction while maintaining 
        grasp functionality.
      </Paragraph>

      <Figure 
        alt="Point cloud with fitted linear subspace" 
        caption="Figure 2: Configuration space data with the low-dimensional eigen-grasp subspace"
      />

      <Separator />

      <SectionHeading level={2} id="grasp-constraints">
        Grasp constraints: The mathematical framework
      </SectionHeading>

      <Paragraph>
        A grasp is defined by a set of contacts between the hand and object that satisfy specific 
        physical constraints. These constraints fall into two categories: kinematic and force-based.
      </Paragraph>

      <SectionHeading level={3} id="kinematic-constraints">
        Kinematic constraints
      </SectionHeading>

      <Paragraph>
        Kinematic constraints ensure that contacts are maintained during manipulation. For a hand 
        configuration <MathInline>\mathbf{q}</MathInline>, let <MathInline>\mathbf{p}_i(\mathbf{q})</MathInline> 
        denote the position of the <MathInline>i</MathInline>-th fingertip. The forward kinematics 
        mapping from joint angles to fingertip positions is typically smooth and differentiable.
      </Paragraph>

      <Paragraph>
        Contact maintenance requires that fingertips remain on the object surface. For a fixed object, 
        this constraint can be written as:
      </Paragraph>
      <MathBlock>
        h(\mathbf{q}) = 0
      </MathBlock>

      <Paragraph>
        where <MathInline>h: \mathbb{R}^n \rightarrow \mathbb{R}^c</MathInline> encodes all 
        <MathInline>c</MathInline> contact constraints. For small perturbations 
        <MathInline>\delta\mathbf{q}</MathInline> around a grasp configuration 
        <MathInline>\mathbf{q}^*</MathInline>, the linearized constraint is:
      </Paragraph>
      <MathBlock>
        \mathbf{J}_h(\mathbf{q}^*) \delta\mathbf{q} = 0
      </MathBlock>

      <Paragraph>
        The solutions to this equation form the nullspace <MathInline>\mathcal{N}(\mathbf{J}_h)</MathInline>, 
        which represents all instantaneous joint motions that maintain the grasp. This nullspace is a 
        linear subspace of dimension <MathInline>n - \text{rank}(\mathbf{J}_h)</MathInline>.
      </Paragraph>

      <SectionHeading level={3} id="force-constraints">
        Force constraints
      </SectionHeading>

      <Paragraph>
        Force constraints ensure grasp stability. Contact forces must lie within friction cones defined 
        by the coefficient of friction. For equilibrium grasps, the net wrench (force and torque) on 
        the object must equal the desired value, often zero. These constraints further restrict the 
        feasible grasp configurations but typically don't change the local dimensionality of the 
        constraint manifold.
      </Paragraph>

      <Figure 
        alt="Hand-object contact with constraint regions" 
        caption="Figure 3: Grasp constraints include both kinematic (contact maintenance) and force (friction cone) requirements"
      />

      <Separator />

      <SectionHeading level={2} id="two-finger-model">
        The two-finger pinch model
      </SectionHeading>

      <Paragraph>
        To analyze the geometry of grasp constraints explicitly, we consider a planar two-finger 
        system. Each finger has two revolute joints, giving four total degrees of freedom: 
        <MathInline>\mathbf{q} = [q_1, q_2, q_3, q_4]^T</MathInline>.
      </Paragraph>

      <Paragraph>
        The forward kinematics for each finger can be written as:
      </Paragraph>
      <SimpleCodeBlock>
{`# Left finger (joints q1, q2)
p_L_x = L1*cos(q1) + L2*cos(q1+q2)
p_L_y = L1*sin(q1) + L2*sin(q1+q2)

# Right finger (joints q3, q4)  
p_R_x = d - L3*cos(q3) - L4*cos(q3+q4)
p_R_y = L3*sin(q3) + L4*sin(q3+q4)`}</SimpleCodeBlock>

      <Paragraph>
        where <MathInline>L_i</MathInline> are link lengths and <MathInline>d</MathInline> is the 
        horizontal separation between finger bases.
      </Paragraph>

      <Paragraph>
        The Jacobian matrices relate joint velocities to fingertip velocities:
      </Paragraph>
      <MathBlock>
        \mathbf{J}_L = \begin{bmatrix}
        -L_1\sin(q_1) - L_2\sin(q_1+q_2) & -L_2\sin(q_1+q_2) \\
        L_1\cos(q_1) + L_2\cos(q_1+q_2) & L_2\cos(q_1+q_2)
        \end{bmatrix}
      </MathBlock>

      <Paragraph>
        with a similar expression for <MathInline>\mathbf{J}_R</MathInline>. These Jacobians are 
        configuration-dependent but locally constant for small motions.
      </Paragraph>

      <Figure 
        alt="Two planar fingers pinching an object" 
        caption="Figure 4: Two-finger planar system with four total degrees of freedom"
      />

      <Separator />

      <SectionHeading level={2} id="pinch-constraints">
        Pinch constraints: From four dimensions to one
      </SectionHeading>

      <Paragraph>
        We analyze two types of pinch contact: stick (maintaining contact with fixed points) and slide 
        (allowing motion along the object boundary). Both cases demonstrate how constraints reduce the 
        system's effective dimensionality.
      </Paragraph>

      <SectionHeading level={3} id="stick-contact">
        Stick contact analysis
      </SectionHeading>

      <Paragraph>
        For stick contact, each fingertip must maintain its position relative to the object. Since the 
        object is fixed, the fingertips must move together to maintain contact. This gives us the 
        velocity constraint:
      </Paragraph>
      <MathBlock>
        \mathbf{J}_L \begin{bmatrix} \delta q_1 \\ \delta q_2 \end{bmatrix} = 
        \mathbf{J}_R \begin{bmatrix} \delta q_3 \\ \delta q_4 \end{bmatrix}
      </MathBlock>

      <Paragraph>
        This provides two scalar equations (one for each spatial dimension). Additionally, for opposed 
        contact forces in a pinch, the distal links must maintain opposition. For planar fingers, this 
        means:
      </Paragraph>
      <MathBlock>
        \delta(q_1 + q_2) + \delta(q_3 + q_4) = 0
      </MathBlock>

      <Paragraph>
        Combining these constraints yields a system of three equations in four unknowns:
      </Paragraph>
      <MathBlock>
        \mathbf{A} \delta\mathbf{q} = 0
      </MathBlock>

      <Paragraph>
        where <MathInline>\mathbf{A} \in \mathbb{R}^{3 \times 4}</MathInline>. For generic 
        configurations, <MathInline>\text{rank}(\mathbf{A}) = 3</MathInline>, implying 
        <MathInline>\dim(\mathcal{N}(\mathbf{A})) = 1</MathInline>.
      </Paragraph>

      <Paragraph>
        The nullspace is spanned by a single vector <MathInline>\mathbf{n} \in \mathbb{R}^4</MathInline>. 
        All feasible instantaneous motions take the form <MathInline>\delta\mathbf{q} = \alpha\mathbf{n}</MathInline> 
        for scalar <MathInline>\alpha</MathInline>. This scalar parameter is the "one dial" that 
        controls the entire grasp.
      </Paragraph>

      <SectionHeading level={3} id="slide-contact">
        Slide contact analysis
      </SectionHeading>

      <Paragraph>
        For slide contact, fingertips can move along the object boundary while maintaining contact. 
        Both fingertips must move tangentially with the same displacement:
      </Paragraph>
      <MathBlock>
        \mathbf{J}_L \begin{bmatrix} \delta q_1 \\ \delta q_2 \end{bmatrix} = \mathbf{t} \delta s
      </MathBlock>
      <MathBlock>
        \mathbf{J}_R \begin{bmatrix} \delta q_3 \\ \delta q_4 \end{bmatrix} = \mathbf{t} \delta s
      </MathBlock>

      <Paragraph>
        where <MathInline>\mathbf{t}</MathInline> is the tangent direction and 
        <MathInline>\delta s</MathInline> is the slide distance. Combined with the opposition 
        constraint, we can solve for <MathInline>\delta\mathbf{q}</MathInline> as a function of 
        <MathInline>\delta s</MathInline>:
      </Paragraph>
      <MathBlock>
        \delta\mathbf{q} = \mathbf{N} \delta s
      </MathBlock>

      <Paragraph>
        Again, we have one-dimensional control: the slide parameter <MathInline>\delta s</MathInline> 
        determines all joint motions through the vector <MathInline>\mathbf{N}</MathInline>.
      </Paragraph>

      <Separator />

      <SectionHeading level={2} id="local-linearity">
        From instantaneous to finite: Local linearity
      </SectionHeading>

      <Paragraph>
        The instantaneous analysis shows that maintaining a pinch restricts motion to a one-dimensional 
        subspace. For finite displacements, the set of valid pinch configurations forms a curve in 
        configuration space—a one-dimensional manifold embedded in <MathInline>\mathbb{R}^4</MathInline>.
      </Paragraph>

      <Paragraph>
        Near any configuration <MathInline>\mathbf{q}^*</MathInline>, we can parameterize this curve 
        using Taylor expansion:
      </Paragraph>
      <MathBlock>
        \mathbf{q}(z) = \mathbf{q}^* + \mathbf{n}z + \frac{1}{2}\mathbf{w}z^2 + O(z^3)
      </MathBlock>

      <Paragraph>
        where <MathInline>\mathbf{n}</MathInline> is the tangent (nullspace direction) and 
        <MathInline>\mathbf{w}</MathInline> represents curvature. For small <MathInline>|z|</MathInline>, 
        the linear term dominates. The quadratic term contributes errors of order <MathInline>z^2</MathInline>, 
        which are negligible for local motions.
      </Paragraph>

      <Paragraph>
        This local linearity is key to understanding why PCA succeeds. Data collected from small 
        variations around a grasp configuration will lie approximately along a line in the direction 
        <MathInline>\mathbf{n}</MathInline>. The curvature only becomes significant for larger 
        excursions from the reference configuration.
      </Paragraph>

      <SectionHeading level={3} id="data-structure">
        Structure in grasp data
      </SectionHeading>

      <Paragraph>
        In experimental data from pinch grasps, this linear structure manifests clearly. Pairwise 
        plots of joint angles (e.g., <MathInline>q_1</MathInline> vs <MathInline>q_2</MathInline>) 
        show approximately linear relationships with slopes determined by the ratios in 
        <MathInline>\mathbf{n}</MathInline>.
      </Paragraph>

      <Paragraph>
        In the full configuration space, the data forms an elongated distribution—longer in the 
        direction <MathInline>\mathbf{n}</MathInline> than in perpendicular directions. This is 
        precisely the structure that PCA identifies: the first principal component aligns with the 
        direction of maximum variance, which corresponds to the physically meaningful synergy direction.
      </Paragraph>

      <Figure 
        alt="Joint angle correlations showing linear structure" 
        caption="Figure 5: Pairwise joint plots reveal linear correlations imposed by grasp constraints"
      />

      <Separator />

      <Paragraph style={{ 
        marginTop: '3rem', 
        padding: '1.5rem', 
        background: 'var(--base2)', 
        borderRadius: '4px',
        borderLeft: '4px solid var(--blue)'
      }}>
        <Strong>End of Part 1</Strong>
        <br/><br/>
        In this first part, we've established how the constraints of maintaining a grasp force 
        configuration space to collapse from high dimensions to low dimensions. The key insight is 
        that these constraint manifolds are locally linear, making them naturally suited to linear 
        dimensionality reduction techniques.
        <br/><br/>
        <Link href="/eigengrasp-blog-part2">Continue to Part 2 →</Link> where we examine why PCA 
        specifically captures these physical synergies and quantify the approximation quality.
      </Paragraph>

    </BlogContainer>
  );
}
