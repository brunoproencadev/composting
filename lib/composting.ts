export type Method = "garden" | "worms";
export const guides: Record<Method,{title:string; text:string; steps:{title:string;text:string}[]}> = {
  garden:{title:"Um quintal cheio de possibilidades.",text:"Compostagem aeróbia, sem necessidade de minhocas: espaço, materiais secos e cuidado regular.",steps:[
    {title:"Prepare o cantinho",text:"Escolha um local drenado, com sombra parcial e acesso à água. Use uma composteira ventilada e protegida de animais; comece com galhos finos e folhas secas."},
    {title:"Monte a mistura",text:"Intercale sobras vegetais picadas com folhas secas ou papelão sem revestimento. Como ponto de partida, use duas a três partes de secos para uma de frescos, em volume, ajustando conforme a mistura."},
    {title:"Cuide do equilíbrio",text:"Mantenha a umidade de uma esponja torcida, sem encharcar. Revolva para incorporar ar; se houver cheiro forte, adicione secos e misture. Cubra sempre os alimentos."},
    {title:"Dê tempo à natureza",text:"Quando o material estiver escuro, solto, com cheiro de terra e sem restos reconhecíveis, deixe maturar. Use o composto pronto como complemento do solo, sem confundir material ainda fresco com composto maduro."},
  ]},
  worms:{title:"Pouco espaço. Muito recomeço.",text:"Um minhocário transforma pequenas porções de resíduos com a ajuda de minhocas próprias para compostagem.",steps:[
    {title:"Prepare um lar para elas",text:"Use um minhocário com ventilação e drenagem, em local protegido de sol e chuva. Prepare a cama úmida com papelão sem revestimento e folhas; obtenha minhocas de compostagem e siga as instruções do sistema."},
    {title:"Alimente aos poucos",text:"Comece com pequenas porções de cascas e vegetais picados. Enterre na cama e cubra com secos. Só aumente a quantidade quando as minhocas estiverem consumindo o alimento anterior."},
    {title:"Observe, sem revirar tudo",text:"A cama deve ficar úmida, sem encharcar. Evite calor e excesso de alimento. Não revolva como uma pilha quente: preserve a cama e aeração do minhocário. Cheiro ruim pede menos alimento e revisão da umidade."},
    {title:"Colha com cuidado",text:"Quando houver composto escuro e com cheiro de terra, separe as minhocas conforme o modelo do sistema e deixe o material estabilizar. Líquido drenado não é composto pronto nem fertilizante automaticamente seguro."},
  ]}
};
export const materials = [
 {id:"banana",name:"Cascas de frutas",emoji:"🍌",garden:"Pode",worms:"Pode",text:"Use cascas picadas e cubra com material seco. No minhocário, ofereça pequenas quantidades e acompanhe o consumo."},
 {id:"coffee",name:"Borra de café",emoji:"☕",garden:"Pode",worms:"Pode",text:"Misture a outros materiais, sem formar uma camada compacta. No minhocário, adicione pouco por vez; filtro de papel simples também pode entrar."},
 {id:"leaves",name:"Folhas secas",emoji:"🍂",garden:"Pode",worms:"Pode",text:"Ajudam a equilibrar a umidade e fornecem carbono. Evite folhas de plantas doentes ou tratadas com produtos que possam contaminar o composto."},
 {id:"citrus",name:"Cítricos",emoji:"🍊",garden:"Depende",worms:"Evite",text:"Na pilha de quintal, pequenas quantidades picadas podem entrar em uma mistura diversa. No minhocário doméstico, prefira evitar cítricos para não alterar a acidez da cama."},
 {id:"meat",name:"Carne e laticínios",emoji:"🧀",garden:"Evite",worms:"Evite",text:"Em sistemas domésticos simples, podem causar odores e atrair animais. Não adicione carne, peixe, ossos, queijo ou outros laticínios."},
 {id:"cardboard",name:"Papelão simples",emoji:"📦",garden:"Pode",worms:"Pode",text:"Use picado e sem plastificação, cera, fita ou cola. No minhocário, umedeça para compor a cama, sem encharcar."},
 {id:"oil",name:"Óleo e gordura",emoji:"🫗",garden:"Evite",worms:"Evite",text:"Prejudicam o equilíbrio e podem atrair animais. Separe o óleo de cozinha e procure um ponto de coleta; nunca despeje na pia."},
 {id:"plastic",name:"Bioplástico",emoji:"🥤",garden:"Depende",worms:"Evite",text:"O rótulo compostável não garante decomposição em casa. Muitos produtos precisam de compostagem industrial. Só use se houver certificação doméstica e compatibilidade com seu sistema; no minhocário, evite."},
] as const;
export function classifyMaterial(id:string, method:Method){const material=materials.find(m=>m.id===id);return material?{...material,status:material[method]}:null;}