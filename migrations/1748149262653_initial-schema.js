/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.sql(`
    -- Criar extensão para suportar UUIDs, se ainda não estiver ativada
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    -- Tabela de Usuários
    CREATE TABLE IF NOT EXISTS usuarios (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      nome VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      telefone VARCHAR(20),
      imagem_perfil VARCHAR(255),
      departamento VARCHAR(100),
      esta_ativo BOOLEAN DEFAULT TRUE,
      criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      ultimo_login TIMESTAMP
    );

    -- Tabela de Funções
    CREATE TABLE IF NOT EXISTS cargos (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      nome VARCHAR(50) NOT NULL UNIQUE,
      descricao VARCHAR(255),
      nivel_permissao INTEGER NOT NULL,
      criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Tabela de Relação Usuários-Papéis
    CREATE TABLE IF NOT EXISTS usuario_cargos (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      usuario_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
      cargo_id UUID NOT NULL REFERENCES cargos(id) ON DELETE CASCADE,
      atribuido_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      expira_em TIMESTAMP,
      UNIQUE(usuario_id, cargo_id)
    );

    -- Tabela de Prédios
    CREATE TABLE IF NOT EXISTS edificios (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      nome VARCHAR(100) NOT NULL,
      endereco VARCHAR(255),
      descricao TEXT,
      andar INTEGER NOT NULL,
      horario_abertura TIME,
      horario_fechamento TIME,
      esta_ativo BOOLEAN DEFAULT TRUE,
      criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Tabela de Departamentos
    CREATE TABLE IF NOT EXISTS departamentos (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      nome VARCHAR(100) NOT NULL,
      descricao TEXT,
      gerente_id UUID REFERENCES usuarios(id) ON DELETE SET NULL,
      criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Tabela de Salas
    CREATE TABLE IF NOT EXISTS salas (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      nome VARCHAR(100) NOT NULL,
      construcao_id UUID NOT NULL REFERENCES edificios(id) ON DELETE CASCADE,
      departamento_id UUID REFERENCES departamentos(id) ON DELETE SET NULL,
      floor INTEGER NOT NULL,
      capacidade INTEGER NOT NULL,
      descricao TEXT,
      tipo_sala VARCHAR(50) NOT NULL,
      esta_ativo BOOLEAN DEFAULT TRUE,
      criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Tabela de Equipamentos
    CREATE TABLE IF NOT EXISTS equipamento (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      nome VARCHAR(100) NOT NULL,
      descricao TEXT,
      category VARCHAR(50),
      criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Tabela de Relação Salas-Equipamentos
    CREATE TABLE IF NOT EXISTS sala_equipamento (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      sala_id UUID NOT NULL REFERENCES salas(id) ON DELETE CASCADE,
      equipamento_id UUID NOT NULL REFERENCES equipamento(id) ON DELETE CASCADE,
      quantidade INTEGER NOT NULL DEFAULT 1,
      status VARCHAR(50) DEFAULT 'operacional',
      last_maintenance TIMESTAMP,
      UNIQUE(sala_id, equipamento_id)
    );

    -- Tabela de Imagens das Salas
    CREATE TABLE IF NOT EXISTS imagem_sala (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      sala_id UUID NOT NULL REFERENCES salas(id) ON DELETE CASCADE,
      url_imagem VARCHAR(255) NOT NULL,
      descricao VARCHAR(255),
      uploaded_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Tabela de Reservas
    CREATE TABLE IF NOT EXISTS reservas (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      sala_id UUID NOT NULL REFERENCES salas(id) ON DELETE CASCADE,
      usuario_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
      tempo_inicio TIMESTAMP NOT NULL,
      tempo_fim TIMESTAMP NOT NULL,
      titulo VARCHAR(100) NOT NULL,
      descricao TEXT,
      status VARCHAR(20) DEFAULT 'confirmado',
      numero_participantes INTEGER DEFAULT 1,
      e_recorrente BOOLEAN DEFAULT FALSE,
      padrao_recorrencia VARCHAR(50),
      criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      cancelado_em TIMESTAMP,
      CHECK (tempo_fim > tempo_inicio)
    );

    -- Tabela de Participantes das Reservas
    CREATE TABLE IF NOT EXISTS participantes_reservas (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      reserva_id UUID NOT NULL REFERENCES reservas(id) ON DELETE CASCADE,
      usuario_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
      cargo VARCHAR(50) DEFAULT 'participante',
      confirmado BOOLEAN DEFAULT FALSE,
      convidado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      confirmado_em TIMESTAMP,
      UNIQUE(reserva_id, usuario_id)
    );

    -- Tabela de Histórico de Reservas
    CREATE TABLE IF NOT EXISTS historico_reserva (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      reserva_id UUID NOT NULL REFERENCES reservas(id) ON DELETE CASCADE,
      usuario_id UUID REFERENCES usuarios(id) ON DELETE SET NULL,
      acao VARCHAR(50) NOT NULL,
      status_anterior VARCHAR(20),
      status_novo VARCHAR(20),
      criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Tabela de Notificações
    CREATE TABLE IF NOT EXISTS notificacoes (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      usuario_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
      tipo VARCHAR(50) NOT NULL,
      titulo VARCHAR(100) NOT NULL,
      message TEXT NOT NULL,
      is_read BOOLEAN DEFAULT FALSE,
      criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      read_em TIMESTAMP
    );

    -- Tabela de Favoritos
    CREATE TABLE IF NOT EXISTS favoritos (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      usuario_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
      sala_id UUID NOT NULL REFERENCES salas(id) ON DELETE CASCADE,
      criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(usuario_id, sala_id)
    );

    -- Tabela de Avaliações
    CREATE TABLE IF NOT EXISTS reviews (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      usuario_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
      sala_id UUID NOT NULL REFERENCES salas(id) ON DELETE CASCADE,
      avaliacao INTEGER NOT NULL CHECK (avaliacao BETWEEN 1 AND 5),
      comentario TEXT,
      criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(usuario_id, sala_id)
    );

    -- Criar índices para melhorar a performance das consultas
    CREATE INDEX idx_reservas_sala_id ON reservas(sala_id);
    CREATE INDEX idx_reservas_usuario_id ON reservas(usuario_id);
    CREATE INDEX idx_reservas_tempo_inicio ON reservas(tempo_inicio);
    CREATE INDEX idx_reservas_tempo_fim ON reservas(tempo_fim);
    CREATE INDEX idx_reservas_status ON reservas(status);
    CREATE INDEX idx_salas_construcao_id ON salas(construcao_id);
    CREATE INDEX idx_salas_departamento_id ON salas(departamento_id);
    CREATE INDEX idx_salas_tipo_sala ON salas(tipo_sala);
    CREATE INDEX idx_sala_equipamento_sala_id ON sala_equipamento(sala_id);
    CREATE INDEX idx_sala_equipamento_equipamento_id ON sala_equipamento(equipamento_id);
    CREATE INDEX idx_participantes_reservas_reserva_id ON participantes_reservas(reserva_id);
    CREATE INDEX idx_participantes_reservas_usuario_id ON participantes_reservas(usuario_id);
    CREATE INDEX idx_notificacoes_usuario_id ON notificacoes(usuario_id);
    CREATE INDEX idx_notificacoes_is_read ON notificacoes(is_read);
    CREATE INDEX idx_favoritos_usuario_id ON favoritos(usuario_id);
    CREATE INDEX idx_reviews_sala_id ON reviews(sala_id);
    CREATE INDEX idx_reviews_avaliacao ON reviews(avaliacao);

    -- Criar funções e triggers para automatizar tarefas

    -- Função para atualizar o timestamp de atualizado_em
    CREATE OR REPLACE FUNCTION atualizar_atualizado_em_coluna()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.atualizado_em = CURRENT_TIMESTAMP;
      RETURN NEW;
    END;
    $$ language 'plpgsql';

    -- Trigger para atualizar o timestamp de atualizado_em em usuarios
    CREATE TRIGGER atualizar_usuarios_atualizado_em
    BEFORE UPDATE ON usuarios
    FOR EACH ROW
    EXECUTE FUNCTION atualizar_atualizado_em_coluna();

    -- Trigger para atualizar o timestamp de atualizado_em em reservas
    CREATE TRIGGER atualizar_reservas_atualizado_em
    BEFORE UPDATE ON reservas
    FOR EACH ROW
    EXECUTE FUNCTION atualizar_atualizado_em_coluna();

    -- Trigger para atualizar o timestamp de atualizado_em em reviews
    CREATE TRIGGER atualizar_reviews_atualizado_em
    BEFORE UPDATE ON reviews
    FOR EACH ROW
    EXECUTE FUNCTION atualizar_atualizado_em_coluna();

    -- Função para registrar alterações em reservas no histórico
    CREATE OR REPLACE FUNCTION log_mudanca_reserva()
    RETURNS TRIGGER AS $$
    BEGIN
      IF TG_OP = 'INSERT' THEN
          INSERT INTO historico_reserva (reserva_id, usuario_id, acao, status_anterior, status_novo)
          VALUES (NEW.id, NEW.usuario_id, 'create', NULL, NEW.status);
      ELSIF TG_OP = 'UPDATE' THEN
          IF OLD.status <> NEW.status THEN
            INSERT INTO historico_reserva (reserva_id, usuario_id, acao, status_anterior, status_novo)
            VALUES (NEW.id, NEW.usuario_id, 'update', OLD.status, NEW.status);
          END IF;
      ELSIF TG_OP = 'DELETE' THEN
          INSERT INTO historico_reserva (reserva_id, usuario_id, acao, status_anterior, status_novo)
          VALUES (OLD.id, OLD.usuario_id, 'delete', OLD.status, NULL);
      END IF;
      RETURN NULL;
    END;
    $$ language 'plpgsql';

    -- Trigger para registrar alterações em reservas
    CREATE TRIGGER log_mudanca_reserva_trigger
    AFTER INSERT OR UPDATE OR DELETE ON reservas
    FOR EACH ROW
    EXECUTE FUNCTION log_mudanca_reserva();

    -- Função para verificar conflitos de reserva
    CREATE OR REPLACE FUNCTION checkar_conflito_reserva()
    RETURNS TRIGGER AS $$
    DECLARE
      contagem_conflitos INTEGER;
    BEGIN
      -- Verificar se há conflito de horário para a mesma sala
      SELECT COUNT(*) INTO contagem_conflitos
      FROM reservas
      WHERE sala_id = NEW.sala_id
        AND id <> NEW.id  -- Ignorar a própria reserva em caso de update
        AND status <> 'cancelado'
        AND (
          (NEW.tempo_inicio BETWEEN tempo_inicio AND tempo_fim) OR
          (NEW.tempo_fim BETWEEN tempo_inicio AND tempo_fim) OR
          (tempo_inicio BETWEEN NEW.tempo_inicio AND NEW.tempo_fim) OR
          (tempo_fim BETWEEN NEW.tempo_inicio AND NEW.tempo_fim)
        );
      
      IF contagem_conflitos > 0 THEN
          RAISE EXCEPTION 'Conflito de horário: a sala já está reservada para o período solicitado.';
      END IF;
      
      RETURN NEW;
    END;
    $$ language 'plpgsql';

    -- Trigger para verificar conflitos antes de inserir ou atualizar uma reserva
    CREATE TRIGGER checkar_conflito_reserva_trigger
    BEFORE INSERT OR UPDATE ON reservas
    FOR EACH ROW
    EXECUTE FUNCTION checkar_conflito_reserva();

    -- Função para enviar notificação quando uma reserva é criada
    CREATE OR REPLACE FUNCTION notificar_criacao_reserva()
    RETURNS TRIGGER AS $$
    BEGIN
      -- Notificar o criador da reserva
      INSERT INTO notificacoes (usuario_id, tipo, titulo, message)
      VALUES (NEW.usuario_id, 'confirmacao_reserva', 'Reserva Confirmada', 
              'Sua reserva para ' || (SELECT nome FROM salas WHERE id = NEW.sala_id) || 
              ' foi confirmada para ' || to_char(NEW.tempo_inicio, 'DD/MM/YYYY HH24:MI') || 
              ' até ' || to_char(NEW.tempo_fim, 'DD/MM/YYYY HH24:MI') || '.');
      
      RETURN NULL;
    END;
    $$ language 'plpgsql';

    -- Trigger para enviar notificação quando uma reserva é criada
    CREATE TRIGGER notificar_criacao_reserva_trigger
    AFTER INSERT ON reservas
    FOR EACH ROW
    EXECUTE FUNCTION notificar_criacao_reserva();

    -- Função para enviar notificação quando uma reserva é cancelada
    CREATE OR REPLACE FUNCTION notificar_reserva_cancelada()
    RETURNS TRIGGER AS $$
    BEGIN
      IF NEW.status = 'cancelado' AND OLD.status <> 'cancelado' THEN
          -- Notificar o criador da reserva
          INSERT INTO notificacoes (usuario_id, tipo, titulo, message)
          VALUES (NEW.usuario_id, 'reserva_cancelada', 'Reserva Cancelada', 
                  'Sua reserva para ' || (SELECT nome FROM salas WHERE id = NEW.sala_id) || 
                  ' foi cancelada.');
          
          -- Notificar os participantes
          INSERT INTO notificacoes (usuario_id, tipo, titulo, message)
          SELECT usuario_id, 'reserva_cancelada', 'Reserva Cancelada', 
                'A reserva "' || NEW.titulo || '" para ' || (SELECT nome FROM salas WHERE id = NEW.sala_id) || 
                ' foi cancelada.'
          FROM participantes_reservas
          WHERE reserva_id = NEW.id AND usuario_id <> NEW.usuario_id;
      END IF;
      
      RETURN NULL;
    END;
    $$ language 'plpgsql';

    -- Trigger para enviar notificação quando uma reserva é cancelada
    CREATE TRIGGER notificar_reserva_cancelada_trigger
    AFTER UPDATE ON reservas
    FOR EACH ROW
    EXECUTE FUNCTION notificar_reserva_cancelada();

    -- Função para enviar notificação quando um usuário é adicionado como participante
    CREATE OR REPLACE FUNCTION notificar_participante_adicionado()
    RETURNS TRIGGER AS $$
    DECLARE
      reserva_titulo TEXT;
      sala_nome TEXT;
      tempo_inicio TIMESTAMP;
    BEGIN
      SELECT r.titulo, rm.nome, r.tempo_inicio 
      INTO reserva_titulo, sala_nome, tempo_inicio
      FROM reservas r
      JOIN salas rm ON r.sala_id = rm.id
      WHERE r.id = NEW.reserva_id;
      
      -- Notificar o participante adicionado
      INSERT INTO notificacoes (usuario_id, tipo, titulo, message)
      VALUES (NEW.usuario_id, 'convite_reserva', 'Convite para Reserva', 
              'Você foi convidado para "' || reserva_titulo || '" em ' || sala_nome || 
              ' no dia ' || to_char(tempo_inicio, 'DD/MM/YYYY HH24:MI') || '.');
      
      RETURN NULL;
    END;
    $$ language 'plpgsql';

    -- Trigger para enviar notificação quando um usuário é adicionado como participante
    CREATE TRIGGER notificar_participante_adicionado_trigger
    AFTER INSERT ON participantes_reservas
    FOR EACH ROW
    EXECUTE FUNCTION notificar_participante_adicionado();
  `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.sql(`
    -- Remover Triggers e Funções na ordem inversa de sua criação e dependência
    DROP TRIGGER IF EXISTS notificar_participante_adicionado_trigger ON participantes_reservas;
    DROP FUNCTION IF EXISTS notificar_participante_adicionado();

    DROP TRIGGER IF EXISTS notificar_reserva_cancelada_trigger ON reservas;
    DROP FUNCTION IF EXISTS notificar_reserva_cancelada();

    DROP TRIGGER IF EXISTS notificar_criacao_reserva_trigger ON reservas;
    DROP FUNCTION IF EXISTS notificar_criacao_reserva();

    DROP TRIGGER IF EXISTS checkar_conflito_reserva_trigger ON reservas;
    DROP FUNCTION IF EXISTS checkar_conflito_reserva();

    DROP TRIGGER IF EXISTS log_mudanca_reserva_trigger ON reservas;
    DROP FUNCTION IF EXISTS log_mudanca_reserva();

    DROP TRIGGER IF EXISTS atualizar_reviews_atualizado_em ON reviews;
    DROP TRIGGER IF EXISTS atualizar_reservas_atualizado_em ON reservas;
    DROP TRIGGER IF EXISTS atualizar_usuarios_atualizado_em ON usuarios;
    DROP FUNCTION IF EXISTS atualizar_atualizado_em_coluna();

    -- Remover Índices (opcional para 'down', mas bom para limpeza completa)
    -- Os índices são geralmente removidos quando a tabela é dropada, mas para ser explícito:
    DROP INDEX IF EXISTS idx_reviews_avaliacao;
    DROP INDEX IF EXISTS idx_reviews_sala_id;
    DROP INDEX IF EXISTS idx_favoritos_usuario_id;
    DROP INDEX IF EXISTS idx_notificacoes_is_read;
    DROP INDEX IF EXISTS idx_notificacoes_usuario_id;
    DROP INDEX IF EXISTS idx_participantes_reservas_usuario_id;
    DROP INDEX IF EXISTS idx_participantes_reservas_reserva_id;
    DROP INDEX IF EXISTS idx_sala_equipamento_equipamento_id;
    DROP INDEX IF EXISTS idx_sala_equipamento_sala_id;
    DROP INDEX IF EXISTS idx_salas_tipo_sala;
    DROP INDEX IF EXISTS idx_salas_departamento_id;
    DROP INDEX IF EXISTS idx_salas_construcao_id;
    DROP INDEX IF EXISTS idx_reservas_status;
    DROP INDEX IF EXISTS idx_reservas_tempo_fim;
    DROP INDEX IF EXISTS idx_reservas_tempo_inicio;
    DROP INDEX IF EXISTS idx_reservas_usuario_id;
    DROP INDEX IF EXISTS idx_reservas_sala_id;

    -- Remover Tabelas na ordem inversa de sua criação devido às Foreign Keys
    DROP TABLE IF EXISTS reviews;
    DROP TABLE IF EXISTS favoritos;
    DROP TABLE IF EXISTS notificacoes;
    DROP TABLE IF EXISTS historico_reserva;
    DROP TABLE IF EXISTS participantes_reservas;
    DROP TABLE IF EXISTS imagem_sala;
    DROP TABLE IF EXISTS sala_equipamento;
    DROP TABLE IF EXISTS equipamento;
    DROP TABLE IF EXISTS reservas; -- Depende de salas e usuarios
    DROP TABLE IF EXISTS salas; -- Depende de edificios e departamentos
    DROP TABLE IF EXISTS departamentos; -- Depende de usuarios (gerente_id)
    DROP TABLE IF EXISTS edificios;
    DROP TABLE IF EXISTS usuario_cargos; -- Depende de usuarios e cargos
    DROP TABLE IF EXISTS cargos;
    DROP TABLE IF EXISTS usuarios;

    -- Remover Extensão
    DROP EXTENSION IF EXISTS "uuid-ossp";
  `);
};
