import { Code, Img, Latex, Layout, Txt, Line, Node } from '@motion-canvas/2d';
import { all, beginSlide, createRef, Direction, easeOutCubic, fadeTransition, slideTransition, waitFor } from '@motion-canvas/core';
import { makeSlide } from './makeSlide';



export const title = makeSlide("title", function* (view) {
  view.add(
    <>

      <Layout direction={"column"} alignItems={"center"} gap={16} layout>
        <Txt fontWeight={600} fontSize={60}>Czy program to dowód matematyczny?</Txt>
        <Txt fontSize={30}>Logiczne podstawy teorii typów</Txt>
      </Layout>
      <Txt fontSize={30} position={[0, 200]}>Hubert Małkowski</Txt>
      <Img src={"/public/mathup.png"} size={[851 * 0.5, 315 * .5]} position={[0, 400]} radius={12} />
    </>

  )
})



export const voevodsky = makeSlide("voevodsky", function* (view) {
  view.add(
    <Layout direction="column" alignItems="center" gap={16} layout>
      <Img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/VladimirVoevodsky.jpg/250px-VladimirVoevodsky.jpg"
        width={250 * 1.5}
        height={300 * 1.5}
      />
      <Txt>Vladimir Voevodsky</Txt>
    </Layout>
  )
})


export const sylogizm = makeSlide(null, function* (view) {
  const codeNode = createRef<Latex>();

  view.add(
    <Layout direction="column" alignItems="center" gap={100} layout>
      <Layout direction="column" alignItems="center" gap={16}>
        <Txt >Prawo sylogizmu hipotetycznego</Txt>
        <Latex
          tex="(A \implies B) \implies (B \implies C) \implies (A \implies C)"
          fill="black"
        />
      </Layout>
      <Latex
        ref={codeNode}
        tex="\Lambda\ \text{A}. \Lambda\ \text{B}. \Lambda \text{C}. \lambda\ ab : (\text{A} \rightarrow \text{B}) . \lambda\ bc : (\text{B} \rightarrow \text{C}). \lambda\ a:\text{A. bc (ab a)}"
        fontSize={50}
        fill={"black"}
        opacity={0}
      />
    </Layout>
  );


  yield* fadeTransition(0.5);
  yield* beginSlide("sylogizm.1");
  yield* waitFor(0.5)
  yield* codeNode().opacity(1, 0.5);

  yield* beginSlide("sylogizm.2");
})

export const church = makeSlide(null, function* (view) {
  const imageStack = createRef<Layout>()
  const lambda = createRef<Latex>()

  view.add(
    <>
      <Layout ref={imageStack} direction="column" alignItems="center" gap={16} layout position={[0, 0]}>
        <Img
          src="https://upload.wikimedia.org/wikipedia/en/a/a6/Alonzo_Church.jpg"
          width={235 * 1.5}
          height={314 * 1.5}
        />
        <Txt>Alonzo Church</Txt>
      </Layout>
      <Latex
        ref={lambda}
        fill="black"
        tex="\lambda \text{-calculus}"
        position={[300, 0]}
        fontSize={100}
        opacity={0}
      />
    </>
  )

  yield* fadeTransition(0.5);
  yield* beginSlide("church.1");

  yield* all(
    imageStack().x(0, 0).to(-300, 1, easeOutCubic),
    lambda().opacity(1, 1)
  )

  yield* beginSlide("church.2");
})



export const lambda1 = makeSlide(null, function* (view) {
  const func = createRef<Latex>()
  const lambda = createRef<Latex>()
  const app = createRef<Latex>()

  view.add(
    <>
      <Latex
        ref={func}
        tex="f(x) = x^2 + 1"
        fill="black"
        fontSize={70}
      />

      <Latex
        ref={lambda}
        tex="f({{x}}) = {{x^2 + 1}}"
        fill="black"
        fontSize={70}
      />

      <Latex
        ref={app}
        tex="{{f}}\  {{2}}"
        fill="black"
        opacity={0}
        fontSize={70}
        position={[0, 200]}
      />
    </>
  )

  yield* fadeTransition(0.5);
  yield* beginSlide("lambda1.1");

  yield* all(
    func().y(0, 0).to(-200, 0.5),
    lambda().y(0, 0).to(200, 0.5),

  )
  yield* lambda().tex("{{ \\lambda }} {{x}} {{.}} {{x^2 + 1}}", 1)
  yield* beginSlide("lambda1.2")

  yield* lambda().tex("{{f = }}{{ \\lambda }} {{x}} {{.}} {{x^2 + 1}}", 1)
  yield* beginSlide("lambda1.3")

  yield* all(
    func().opacity(0, 0.3),
    lambda().y(200, 0).to(-200, 0.5),
  )

  yield* app().opacity(1, 0.3)

  yield* beginSlide("lambda1.4")

  yield* app().tex("{{(\\lambda x.}} {{x}}{{^2}} {{+ 1}}{{)\ }} {{2}}", 1)

  yield* beginSlide("lambda1.5")

  yield* app().tex(" {{2}}{{^2}} {{+ 1}}", 1)
  yield* beginSlide("lambda1.6")

  yield* app().tex("{{2}}{{^2}} {{+ 1}} {{\\rightsquigarrow 5}}", 1)
  yield* beginSlide("lambda1.7")
})

export const lambda2 = makeSlide(null, function* (view) {
  const apply = createRef<Latex>()
  const result = createRef<Latex>()

  view.add(
    <>

      <Latex
        ref={apply}
        tex="{{\text{apply}}} = {{\lambda f.}} {{\lambda x.}} {{f}}\ {{x}}"
        fill="black"
        fontSize={70}
      />

      <Latex
        ref={result}
        tex="\text{apply}\ (\lambda n.n^2+1)\ 2 \rightsquigarrow 5"
        fill="black"
        fontSize={70}
        position={[0, 100]}
        opacity={0}
      />
    </>
  )

  yield* fadeTransition(0.5);
  yield* beginSlide("lambda2.1")

  yield* apply().tex("{{(}} {{\\lambda f.}} {{\\lambda x.}} {{f}}\\ {{x}} {{)\\ }} {{(}}{{\\lambda n.}} {{n}}{{^2 + 1}}{{)}}\\", 1)

  yield* beginSlide("lambda2.2")

  yield* apply().tex("{{(}} {{\\lambda x.}} {{(}}{{\\lambda n.}} {{n}}{{^2 + 1}}{{)}}\\ {{x}} {{)\\ }} ", 1)

  yield* beginSlide("lambda2.3")

  yield* apply().tex("{{(}} {{\\lambda x.}} {{(}}{{\\lambda n.}} {{n}}{{^2 + 1}}{{)}}\\ {{x}} {{)\\ }} {{2}} ", 1)

  yield* beginSlide("lambda2.4")

  yield* apply().tex(" {{(}}{{\\lambda n.}} {{n}}{{^2 + 1}}{{)}}\\ {{2}} ", 1)
  yield* apply().tex(" {{2}}{{^2 + 1}}", 1)
  yield* apply().tex(" {{2}}{{^2 + 1}}{{\\rightsquigarrow 5}}", 1)
  yield* beginSlide("lambda2.5")
})


export const omega = makeSlide(null, function* (view) {

  const func = createRef<Latex>()
  // const lambda = createRef<Latex>()
  // const app = createRef<Latex>()
  //
  view.add(
    <>
      <Latex
        ref={func}
        tex="{{(\lambda x.}} {{x}}\ {{x}}{{)}}\ {{(\lambda x. x\ x)}}"
        fill="black"
        fontSize={70}
      />
    </>
  )

  yield* fadeTransition(0.5);
  yield* beginSlide("omega.0")

  yield* func().tex("{{(\\lambda x.}} {{x}}\\ {{x}}{{)}}\\ {{(\\lambda x. x\\ x)}}", 0).to("{{(\\lambda x.}} {{(\\lambda x. x\\ x)}}\\ {{(\\lambda x. x\\ x)}}{{)}}", 1.2).to("{{(\\lambda x. x\\ x)}}\\ {{(\\lambda x. x\\ x)}}", 0.4)
  yield* func().tex("{{(\\lambda x.}} {{x}}\\ {{x}}{{)}}\\ {{(\\lambda x. x\\ x)}}", 0).to("{{(\\lambda x.}} {{(\\lambda x. x\\ x)}}\\ {{(\\lambda x. x\\ x)}}{{)}}", 1.2).to("{{(\\lambda x. x\\ x)}}\\ {{(\\lambda x. x\\ x)}}", 0.4)
  yield* func().tex("{{(\\lambda x.}} {{x}}\\ {{x}}{{)}}\\ {{(\\lambda x. x\\ x)}}", 0).to("{{(\\lambda x.}} {{(\\lambda x. x\\ x)}}\\ {{(\\lambda x. x\\ x)}}{{)}}", 1.2).to("{{(\\lambda x. x\\ x)}}\\ {{(\\lambda x. x\\ x)}}", 0.4)
  yield* func().tex("{{(\\lambda x.}} {{x}}\\ {{x}}{{)}}\\ {{(\\lambda x. x\\ x)}}", 0).to("{{(\\lambda x.}} {{(\\lambda x. x\\ x)}}\\ {{(\\lambda x. x\\ x)}}{{)}}", 1.2).to("{{(\\lambda x. x\\ x)}}\\ {{(\\lambda x. x\\ x)}}", 0.4)


})

export const stlc1 = makeSlide(null, function* (view) {
  const func = createRef<Latex>()

  view.add(
    <>
      <Latex
        ref={func}
        tex="{{\lambda\ }} {{x}}{{.x^2 + 1}}"
        fill="black"
        fontSize={70}
      />
    </>
  )

  yield* fadeTransition(0.5);
  yield* beginSlide("stlc1.1")

  yield* func().tex("{{ \\lambda\\ }} {{x}}{{:\\text{Nat}\\ }}{{.x^2 + 1}}", 1)
  yield* beginSlide("stlc1.2")
})



export const stlc2 = makeSlide(null, function* (view) {

  const arrow = createRef<Latex>()


  view.add(
    <>
      <Latex
        tex="\text{Int},\ \text{Bool},\ \text{Nat},\ \text{B},\ \text{A} \dots"
        fill="black"
        fontSize={70}
        position={[0, -100]}
      />


      <Latex
        ref={arrow}
        tex="A \rightarrow B"
        fill="black"
        fontSize={70}
        position={[0, 100]}
        opacity={0}
      />
    </>
  )

  yield* fadeTransition(0.5);
  yield* beginSlide("stlc2.1")

  yield* arrow().opacity(100, 1)



  yield* beginSlide("stlc2.2")
})





export const stlc3 = makeSlide(null, function* (view) {
  const expr1 = createRef<Latex>()
  const expr2 = createRef<Latex>()
  const expr3 = createRef<Latex>()
  const expr4 = createRef<Latex>()

  view.add(
    <Layout direction="column" alignItems="center" gap={60} layout>
      <Latex ref={expr1} tex="{{5}}" fill="black" fontSize={60} />
      <Latex ref={expr2} tex="{{F = \lambda\ x : \text{Nat}\ .\ x^2}}" fill="black" fontSize={60} />
      <Latex ref={expr3} tex="F\ 2" fill="black" fontSize={60} />
      <Latex ref={expr4} tex="{{\lambda\ a : \text{Nat}\ .\ \lambda\ b : \text{Nat}\ .\ \dfrac{a}{b}}}" fill="black" fontSize={60} />
    </Layout>
  )

  yield* fadeTransition(0.5);
  yield* beginSlide("stlc3.1")

  yield* expr1().tex("{{5}} {{\\quad : \\quad \\text{Nat}}}", 1)
  yield* beginSlide("stlc3.2")

  yield* expr2().tex("{{F = \\lambda\\ x : \\text{Nat}\\ .\\ x^2}} {{\\quad : \\quad \\text{Nat} \\rightarrow \\text{Nat}}}", 1)
  yield* beginSlide("stlc3.3")

  yield* expr3().tex("{{F\\ 2 }}{{\\quad : \\quad \\text{Nat}}}", 1)
  yield* beginSlide("stlc3.4")

  yield* expr4().tex("{{\\lambda\\ a : \\text{Nat}\\ .\\ \\lambda\\ b : \\text{Nat}\\ .\\ \\dfrac{a}{b}}} {{\\quad : \\quad \\text{Nat} \\rightarrow \\text{Nat} \\rightarrow \\mathbb{Q}}}", 1)
  yield* beginSlide("stlc3.5")
})

export const howard = makeSlide(null, function* (view) {
  view.add(
    <>
      <Layout direction="column" alignItems="center" gap={16} layout

        position={[-400, 0]}
      >
        <Img
          src="/public/curry-photo.jpg"
          width={687 * 0.6}
          height={1024 * 0.6}
        />
        <Txt>Haskell Curry</Txt>
      </Layout>
      <Layout direction="column" alignItems="center" gap={16} layout

        position={[400, 0]}
      >
        <Img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/William_Alvin_Howard_May_2004.jpg/250px-William_Alvin_Howard_May_2004.jpg"
          width={450 * 1}
          height={600 * 1}
        />
        <Txt>William Alvin Howard</Txt>
      </Layout>
    </>
  )

  yield* fadeTransition(0.5);
  yield* beginSlide("howard")
})


export const isomorphism1 = makeSlide(null, function* (view) {

  const arrow = createRef<Latex>()

  const nodeLeft = createRef<Node>()
  const nodeRight = createRef<Node>()
  view.add(
    <>
      <Layout direction="column" alignItems="center" justifyContent={"start"} gap={100} layout position={[-400, -100]}>
        <Txt fontSize={60} fontWeight={600} position={[0, -1000]}>Zdania logiczne</Txt>
        <Layout direction={"column"} alignItems="center" gap={100} layout>
          <Latex
            fill={"black"}
            fontSize={60}
            tex="A \implies B"
          />
          <Node opacity={0} ref={nodeLeft}>
            <Latex
              fill={"black"}
              fontSize={60}
              tex="A\ \&\ B"
            />
            <Latex
              fill={"black"}
              fontSize={60}
              tex="A\ \lor\ B"
            />
          </Node>
        </Layout>
      </Layout>
      <Line
        points={[
          [0, -400],
          [0, 400],
        ]}
        lineWidth={8}
        radius={8}
        stroke={"black"}

      />

      <Layout direction="column" alignItems="center" justifyContent={"start"} gap={100} layout position={[400, -100]}>
        <Txt fontSize={60} fontWeight={600} position={[0, -1000]}>Typy</Txt>
        <Layout direction={"column"} alignItems="center" gap={100} layout>

          <Latex
            ref={arrow}
            fill={"black"}
            opacity={0}
            fontSize={60}
            tex="A \rightarrow B"
          />

          <Node opacity={0} ref={nodeRight}>
            <Latex
              fill={"black"}
              fontSize={60}
              tex="A \times B"
            />

            <Latex
              fill={"black"}
              fontSize={60}
              tex="A + B"
            />
          </Node>
        </Layout>
      </Layout>

    </>
  )

  yield* fadeTransition(0.5);
  yield* beginSlide("isomorphism1.0")


  yield* arrow().opacity(1, 1)
  yield* beginSlide("isomorphism1.1")

  yield* all(
    nodeLeft().opacity(1, 1),
    nodeRight().opacity(1, 1)
  )

  yield* beginSlide("isomorphism1.2")
})


export const isomorphism2 = makeSlide(null, function* (view) {
  const proposition = createRef<Latex>()

  view.add(
    <Latex
      ref={proposition}
      tex="{{A}}  {{\implies\ }} {{B  }}  {{\implies\ }} {{ A}}"
      fill="black"
      fontSize={60}
    />
  )

  yield* fadeTransition(0.5);
  yield* beginSlide("isomorphism2.0")

  yield* proposition().tex("{{A}} {{\\rightarrow\\ }} {{B   }} {{\\rightarrow\\ }} {{ A}}", 1);
  yield* beginSlide("isomorphism2.1")

  yield* proposition().tex(" {{\\lambda\\ a:}}{{\\text{A}}}{{\ . \\lambda\\ b:}}{{\\text{B}}}{{\ .a}} {{\\quad : \\quad\\ }}{{A}} {{\\rightarrow\\ }} {{B   }} {{\\rightarrow\\ }} {{ A}}", 1);

  yield* beginSlide("isomorphism2.2")

  yield* proposition().tex(" {{\\lambda\\ a:}}{{\\text{Int}}}{{\ . \\lambda\\ b:}}{{\\text{Bool}}}{{\ .a}} {{\\quad : \\quad\\ }}{{\\text{Int}}} {{\\rightarrow\\ }} {{\\text{Bool}   }} {{\\rightarrow\\ }} {{ \\text{Int}}}", 1);

  yield* beginSlide("isomorphism2.3")
})

export const systemF1 = makeSlide(null, function* (view) {
  view.add(
    <>
      <Layout direction="column" alignItems="center" gap={16} layout

        position={[-400, 0]}
      >
        <Img
          src="https://upload.wikimedia.org/wikipedia/commons/1/1e/Girard.jpg"
          width={480 * 1.2}
          height={360 * 1.2}
        />
        <Txt>Jean-Yves Girard</Txt>
      </Layout>
      <Layout direction="column" alignItems="center" gap={16} layout

        position={[400, 0]}
      >
        <Img
          src="/public/reynolds.jpg"
          width={816 * 0.5}
          height={1232 * 0.5}
        />
        <Txt>John C. Reynoldsa</Txt>
      </Layout>
    </>
  )

  yield* fadeTransition(0.5);
  yield* beginSlide("systemf.0")
})

export const systemF2 = makeSlide(null, function* (view) {

  const lambda = createRef<Latex>()
  const app = createRef<Latex>()
  view.add(
    <>
      <Layout layout direction={"column"} alignItems={"center"} gap={100} >

        <Txt fontSize={60} fontWeight={600}>System F</Txt>
        <Latex
          ref={lambda}
          tex="{{id = \Lambda\ A .\ \lambda\ x:A\ . x}}"
          fontSize={60}
          fill={"black"}
        />

        <Latex
          ref={app}
          tex="id [\text{Int}]"
          fontSize={60}
          fill={"black"}
        />

      </Layout>

    </>
  )

  yield* fadeTransition(0.5);
  yield* beginSlide("systemf2.0")

  yield* lambda().tex("{{id = \\Lambda\\ A .\\ \\lambda\\ x:A\\ . x}} {{ \\quad : \\quad \\forall A . A \\rightarrow A }}", 1)
  yield* beginSlide("systemf2.1")

  yield* app().tex("{{id [\\text{Int}]}}{{\\quad : \\quad \\text{Int} \\rightarrow \\text{Int} }}", 1)

  yield* beginSlide("systemf2.2")
})

export const proof1 = makeSlide(null, function* (view) {
  const lambda = createRef<Latex>()
  view.add(
    <>
      <Latex
        ref={lambda}
        tex="{{\lambda\ a:\text{A}.\lambda\ b:\text{B}.a}}"
        fill={"black"}
        fontSize={60}
      />
    </>
  )

  yield* slideTransition(Direction.Left, 0.5)
  yield* beginSlide("proof1.0")

  yield* lambda().tex("{{\\Lambda\\ \\text{A}. \\Lambda\\ \\text{B}.}}{{\\lambda\\ a:\\text{A}.\\lambda\\ b:\\text{B}.a}}", 1)

  yield* beginSlide("proof1.1")

  yield* lambda().tex("{{\\Lambda\\ \\text{A}. \\Lambda\\ \\text{B}.}}{{\\lambda\\ a:\\text{A}.\\lambda\\ b:\\text{B}.a}}{{\\quad : \\quad \\forall \\text{A}. \\forall \\text{B}. \\text{A} \\rightarrow \\text{B} \\rightarrow \\text{A}}}", 1)

  yield* beginSlide("proof1.2")
})


export const proof2 = makeSlide(null, function* (view) {
  const proposition = createRef<Latex>()
  const proof = createRef<Latex>()

  view.add(
    <Layout layout alignItems={"center"} direction={"column"} gap={100}>
      <Latex
        ref={proposition}
        tex="{{(A}} {{\implies\ }} {{B)}} {{\implies\ }} {{(B}} {{\implies\ }} {{C)}} {{\implies\ }} {{A}} {{\implies\ }} {{C}}"
        fill={"black"}
        fontSize={60}
      />

      <Latex
        ref={proof}
        tex="{{\Lambda\ \text{A}. \Lambda\ \text{B}. \Lambda\ \text{C}.}}"
        fill={"black"}
        fontSize={60}
        opacity={0}
      />
    </Layout>
  )

  yield* fadeTransition(0.5);
  yield* beginSlide("proof2.0")

  yield* proposition().tex("{{(A}} {{\\rightarrow\\ }} {{B)}} {{\\rightarrow\\ }} {{(B}} {{\\rightarrow\\ }} {{C)}} {{\\rightarrow\ }} {{A}} {{\\rightarrow\\ }} {{C}}", 1)
  yield* beginSlide("proof2.1")



  yield* proof().opacity(100, 1)
  yield* beginSlide("proof2.2")

  yield* proof().tex("{{\\Lambda\\ \\text{A}. \\Lambda\\ \\text{B}. \\Lambda\\ \\text{C}.}}{{\\lambda ab : (A \\rightarrow B).}}", 1)


  yield* beginSlide("proof2.3")

  yield* proof().tex("{{\\Lambda\\ \\text{A}. \\Lambda\\ \\text{B}. \\Lambda\\ \\text{C}.}}{{\\lambda ab : (A \\rightarrow B).}} {{\\lambda bc : (B \\rightarrow C).}} ", 1)
  yield* beginSlide("proof2.4")

  yield* proof().tex("{{\\Lambda\\ \\text{A}. \\Lambda\\ \\text{B}. \\Lambda\\ \\text{C}.}}{{\\lambda ab : (A \\rightarrow B).}} {{\\lambda bc : (B \\rightarrow C).}} {{\\lambda\ a:A.}}", 1)
  yield* beginSlide("proof2.5")


  yield* proof().tex("{{\\Lambda\\ \\text{A}. \\Lambda\\ \\text{B}. \\Lambda\\ \\text{C}.}}{{\\lambda ab : (A \\rightarrow B).}} {{\\lambda bc : (B \\rightarrow C).}} {{\\lambda\ a:A.}} {{bc\\ (ab\\ a)}}", 1)
  yield* beginSlide("proof2.6")
})


export const koniec = makeSlide("koniec", function* (view) {
  view.add(
    <>
      <Layout layout justifyContent={"space-around"}>
        <Layout layout direction={"column"} gap={400}>

          <Layout layout direction={"column"} >
            <Txt fontSize={50} fontWeight={600}>Hubert Małkowski</Txt>
            <Txt fontSize={30}>261484@edu.p.lodz.pl</Txt>
          </Layout>

          <Layout layout direction={"column"} gap={8} alignItems={"start"}>
            <Txt fontSize={50} fontWeight={600}>Źródła</Txt>
            <Txt fontSize={30}>Types and Programming Languages - Benjamin C. Pierce (2002)</Txt>
            <Txt fontSize={30}>Type Theory and Formal Proof - Rob Nederpelt, Herman Guevers (2014)</Txt>
            <Txt fontSize={30}>The Origins and Motivations of Univalent Foundations- Vladimir Voedovsky (2014)</Txt>
            <Txt fontSize={30}>Propositions as Types - Philip Wadler (2014)</Txt>
          </Layout>
        </Layout>
        <Img src={"/public/mathup.png"} size={[851 * 0.5, 315 * .5]} position={[0, 400]} radius={12} />

      </Layout>
    </>
  )
})
