# Web Application Document - Projeto Individual - Módulo 2 - Inteli

**_Os trechos em itálico servem apenas como guia para o preenchimento da seção. Por esse motivo, não devem fazer parte da documentação final._**

## Nome do Projeto

ReservaFácil

#### Autor do projeto

Rafael Ryu Tati Nakahara

## Sumário

1. [Introdução](#c1)  
2. [Visão Geral da Aplicação Web](#c2)  
3. [Projeto Técnico da Aplicação Web](#c3)  
4. [Desenvolvimento da Aplicação Web](#c4)  
5. [Referências](#c5)  

<br>

## <a name="c1"></a>1. Introdução

O ReservaFácil é uma aplicação web criada com o intuito de simplificar e otimizar o processo de reserva de salas em ambientes como universidades, escritórios ou espaços de coworking. Atualmente, a gestão dessas reservas é frequentemente feita de forma manual e pouco organizada, gerando conflitos de horário e perda de tempo para os usuários e administradores.

Este projeto visa solucionar esses problemas oferecendo uma plataforma centralizada e de fácil utilização. Através do ReservaFácil, usuários (como estudantes, professores ou funcionários) poderão visualizar a disponibilidade das salas em tempo real, filtrar por características (capacidade, equipamentos), realizar reservas de forma rápida e prática, e gerenciar seus próprios agendamentos. O sistema busca proporcionar eficiência e conveniência, garantindo que os espaços sejam utilizados da melhor forma possível e que os usuários tenham uma experiência de agendamento sem atritos.

---

## <a name="c2"></a>2. Visão Geral da Aplicação Web

### 2.1. Personas (Semana 01)

---
**PERSONA: Gustavo Carlos**
---

<div align = 'left'>
<img src = '../assets/Gustavo.png' width="25%" height="25%">
</div>

**Nome:** Gustavo Carlos

**Idade:** 18 anos

**Ocupação:** Estudante Universitário (1º ano de Veterinária)

**Hábitos Digitais:**
*   Usa smartphone e notebook diariamente para estudos, comunicação e lazer.
*   Ativo em redes sociais (Instagram, WhatsApp) para interagir com colegas/amigos, se manter informado e se entreter.
*   Acessa o portal da universidade para notas, materiais e avisos.
*   Consome conteúdo online (vídeos) relacionado aos seus estudos e hobbies.
*   Familiarizado com compras online.

**Necessidades:**
*   Encontrar salas de estudo disponíveis na universidade de forma rápida e fácil.
*   Reservar salas para estudo individual ou em grupo com antecedência.
*   Saber quais equipamentos (projetor, lousa, ar-condicionado) estão disponíveis em cada sala.
*   Evitar perder tempo procurando por salas desocupadas no campus.
*   Ter um sistema confiável para gerenciar suas reservas.

**Dores:**
*   Frustração por não encontrar salas de estudo livres, especialmente em épocas de prova.
*   Perda de tempo andando pelo campus à procura de um local para estudar.
*   Sistemas de reserva atuais (quando existem) são confusos, manuais ou inexistentes.

**Solução (Como o ReservaFácil o ajuda):**
O ReservaFácil permite que o Gustavo visualize rapidamente todas as salas disponíveis na universidade, filtre por capacidade ou equipamentos (ex: sala com projetor para ensaiar apresentações) e reserve um horário em poucos cliques, diretamente do seu celular ou computador. Ele pode planejar suas sessões de estudo e trabalhos em grupo com antecedência, garantindo um local adequado de forma prática e rápida, reduzindo seu estresse e frustração.

### 2.2. User Stories (Semana 01)

**US01 |** Como estudante, quero visualizar a disponibilidade das salas em tempo real, para que eu possa planejar meus estudos e encontrar um local adequado rapidamente.

**US02 |** Como usuário do sistema, quero poder filtrar as salas por capacidade e tipo de equipamento (ex: projetor, lousa), para que eu encontre uma sala que atenda às minhas necessidades específicas.

**US03 |** Como estudante, quero poder reservar uma sala para um período específico, para que eu possa garantir o espaço para realizar minhas atividades acadêmicas, como estudo individual ou reuniões de grupo.

---
**Análise INVEST da User Story US01:**

**US01 | Como estudante, quero visualizar a disponibilidade das salas em tempo real, para que eu possa planejar meus estudos e encontrar um local adequado rapidamente.**

*   **I – Independente (Independent):**
    *   **Justificativa:** Esta história pode ser desenvolvida e entregue independentemente de outras funcionalidades, como o próprio ato de reservar. A visualização da disponibilidade é um valor em si, mesmo que outras interações não estejam prontas. Um usuário pode, inicialmente, apenas consultar a disponibilidade antes de se dirigir fisicamente ao local.

*   **N – Negociável (Negotiable):**
    *   **Justificativa:** Os detalhes de como a disponibilidade é exibida são negociáveis. Como será exibido, em uma lista, em um calendário? Com que nível de detalhe (apenas "ocupado/livre" ou mostrando quem reservou)?

*   **V – Valiosa (Valuable):**
    *   **Justificativa:** Esta funcionalidade entrega valor direto ao usuário (Gustavo). Resolve a dor de não saber onde há salas disponíveis, economizando tempo e reduzindo frustração. É uma das principais razões pelas quais um usuário utilizaria o sistema.

*   **E – Estimável (Estimable):**
    *   **Justificativa:** É estimar o esforço necessário para implementar essa funcionalidade. É possível quebrar em tarefas menores, como: criar a interface de visualização, conectar a um banco de dados e exibir os dados de status das salas.

*   **S – Pequena (Small):**
    *   **Justificativa:** A funcionalidade de visualizar a disponibilidade, em sua forma mais básica (ex: listar salas e seus status para o dia atual), é suficientemente pequena para ser concluída dentro de uma Sprint. Funcionalidades mais complexas de visualização (filtros avançados, visualização semanal/mensal) podem ser histórias separadas.

*   **T – Testável (Testable):**
    *   **Justificativa:** É possível definir critérios de aceitação claros e testar se a funcionalidade atende a eles. Por exemplo: "Quando o usuário acessa a tela de disponibilidade, ele vê uma lista de salas." "Salas reservadas para o horário atual devem aparecer como 'Ocupada'." "Salas livres devem aparecer como 'Disponível'."

---

## <a name="c3"></a>3. Projeto da Aplicação Web

### 3.1. Modelagem do banco de dados  (Semana 3)

*Posicione aqui os diagramas de modelos relacionais do seu banco de dados, apresentando todos os esquemas de tabelas e suas relações. Utilize texto para complementar suas explicações, se necessário.*

*Posicione também o modelo físico com o Schema do BD (arquivo .sql)*

### 3.1.1 BD e Models (Semana 5)
*Descreva aqui os Models implementados no sistema web*

### 3.2. Arquitetura (Semana 5)

*Posicione aqui o diagrama de arquitetura da sua solução de aplicação web. Atualize sempre que necessário.*

**Instruções para criação do diagrama de arquitetura**  
- **Model**: A camada que lida com a lógica de negócios e interage com o banco de dados.
- **View**: A camada responsável pela interface de usuário.
- **Controller**: A camada que recebe as requisições, processa as ações e atualiza o modelo e a visualização.

*Adicione as setas e explicações sobre como os dados fluem entre o Model, Controller e View.*

### 3.3. Wireframes (Semana 03)

*Posicione aqui as imagens do wireframe construído para sua solução e, opcionalmente, o link para acesso (mantenha o link sempre público para visualização).*

### 3.4. Guia de estilos (Semana 05)

*Descreva aqui orientações gerais para o leitor sobre como utilizar os componentes do guia de estilos de sua solução.*


### 3.5. Protótipo de alta fidelidade (Semana 05)

*Posicione aqui algumas imagens demonstrativas de seu protótipo de alta fidelidade e o link para acesso ao protótipo completo (mantenha o link sempre público para visualização).*

### 3.6. WebAPI e endpoints (Semana 05)

*Utilize um link para outra página de documentação contendo a descrição completa de cada endpoint. Ou descreva aqui cada endpoint criado para seu sistema.*  

### 3.7 Interface e Navegação (Semana 07)

*Descreva e ilustre aqui o desenvolvimento do frontend do sistema web, explicando brevemente o que foi entregue em termos de código e sistema. Utilize prints de tela para ilustrar.*

---

## <a name="c4"></a>4. Desenvolvimento da Aplicação Web (Semana 8)

### 4.1 Demonstração do Sistema Web (Semana 8)

*VIDEO: Insira o link do vídeo demonstrativo nesta seção*
*Descreva e ilustre aqui o desenvolvimento do sistema web completo, explicando brevemente o que foi entregue em termos de código e sistema. Utilize prints de tela para ilustrar.*

### 4.2 Conclusões e Trabalhos Futuros (Semana 8)

*Indique pontos fortes e pontos a melhorar de maneira geral.*
*Relacione também quaisquer outras ideias que você tenha para melhorias futuras.*



## <a name="c5"></a>5. Referências

_Incluir as principais referências de seu projeto, para que seu parceiro possa consultar caso ele se interessar em aprofundar. Um exemplo de referência de livro e de site:_<br>

---