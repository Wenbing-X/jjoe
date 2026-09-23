import { useState } from 'react'
import WorkflowDemo from './WorkflowDemo'
import './interactions.css'

const destinations = [
  { id:'en', region:'北美', language:'英语', code:'EN', lang:'en', quote:'Every story has a beginning.', point:[142,92], route:'M354 155 Q250 5 142 92', label:[112,65] },
  { id:'ja', region:'日本', language:'日语', code:'JP', lang:'ja', quote:'すべての物語には、始まりがある。', point:[421,129], route:'M354 155 Q385 83 421 129', label:[402,99] },
  { id:'es', region:'拉美', language:'西班牙语', code:'ES', lang:'es', quote:'Toda historia tiene un comienzo.', point:[197,226], route:'M354 155 Q271 273 197 226', label:[151,260] },
]

function LocaleDemo() {
  const [selected, setSelected] = useState('en')
  const destination = destinations.find(item => item.id === selected)
  return <article className="locale-demo" aria-labelledby="locale-title">
    <div className="lab-card-heading"><span>01 / WORLD CHANNEL</span><span className="lab-demo-tag">本地化演示</span></div>
    <h3 id="locale-title">一句故事，三种表达。</h3>
    <p className="locale-description">选择一个目的地，看看故事如何换一种语言出发。</p>
    <div className="locale-options" role="group" aria-label="选择目的地">{destinations.map(item => <button type="button" key={item.id} aria-pressed={selected === item.id} onClick={() => setSelected(item.id)}><span>{item.region}</span><small>{item.code}</small></button>)}</div>
    <div className="locale-globe" aria-hidden="true">
      <svg viewBox="0 0 560 310" fill="none"><defs><radialGradient id="locale-glow"><stop stopColor="#91aebb" stopOpacity=".12" /><stop offset="1" stopColor="#91aebb" stopOpacity="0" /></radialGradient></defs>
        <circle cx="280" cy="153" r="137" fill="url(#locale-glow)" />
        <g stroke="#a5bdc9" strokeOpacity=".18"><ellipse cx="280" cy="153" rx="176" ry="114" /><ellipse cx="280" cy="153" rx="117" ry="114" /><ellipse cx="280" cy="153" rx="53" ry="114" /><ellipse cx="280" cy="153" rx="176" ry="67" /><ellipse cx="280" cy="153" rx="176" ry="26" /><path d="M104 153H456M280 39V267" /></g>
        <path className="locale-route" key={selected} d={destination.route} pathLength="1" stroke="#e99479" strokeWidth="1.7" />
        <circle cx="354" cy="155" r="4" fill="#e9e9dd" /><circle cx="354" cy="155" r="10" stroke="#e9e9dd" strokeOpacity=".22" /><text x="365" y="179" className="locale-map-label">CHANGSHA</text>
        {destinations.map(item => <g key={item.id} opacity={item.id === selected ? 1 : .4}><circle cx={item.point[0]} cy={item.point[1]} r={item.id === selected ? 5 : 3} fill={item.id === selected ? '#ed977c' : '#9bb0be'} />{item.id === selected && <circle cx={item.point[0]} cy={item.point[1]} r="12" stroke="#ed977c" strokeOpacity=".4" />}<text x={item.label[0]} y={item.label[1]} className="locale-map-label">{item.id === 'en' ? 'NORTH AMERICA' : item.id === 'ja' ? 'JAPAN' : 'LATIN AMERICA'}</text></g>)}
      </svg>
      <span className="locale-map-caption">连接示意 / CONNECTION STUDY</span>
    </div>
    <div className="locale-caption" role="status" aria-live="polite" aria-atomic="true"><div><span>字幕预览</span><span>{destination.language} / {destination.code}</span></div><p key={selected} lang={destination.lang}>{destination.quote}</p><small>每个故事，都有一个起点。</small></div>
    <p className="locale-footnote">示例文案 · 点击切换预设语言版本</p>
  </article>
}

export default function InteractionLab() {
  return <section id="playground" className="interaction-lab section" aria-labelledby="lab-title"><div className="shell">
    <div className="section-head lab-heading"><div><div className="eyebrow"><span>PLAY</span><span className="label-rule" />INTERACTIVE NOTES</div><h2 id="lab-title">让想法，<br /><span>在指尖发生。</span></h2></div><p>切换一次目的地，走过一次制作流程。<br />用两个小实验，打开内容出海的思路。</p></div>
    <div className="lab-grid"><LocaleDemo /><WorkflowDemo /></div>
  </div></section>
}
