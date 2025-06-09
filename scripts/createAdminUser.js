// scripts/createAdminUser.js
const bcrypt = require('bcrypt');
const db = require('../config/db');

async function createAdminUser() {
  try {
    console.log('🚀 Iniciando criação do usuário administrador...');

    // 1. Verificar se já existe um cargo de administrador
    let adminCargo = await db.query(
      'SELECT * FROM cargos WHERE nome = $1',
      ['Administrador']
    );

    if (adminCargo.rows.length === 0) {
      console.log('📋 Criando cargo de Administrador...');
      
      // Criar cargo de administrador
      const cargoResult = await db.query(`
        INSERT INTO cargos (nome, descricao, nivel_permissao)
        VALUES ($1, $2, $3)
        RETURNING *
      `, [
        'Administrador',
        'Acesso total ao sistema - pode gerenciar usuários, salas, reservas e configurações',
        10
      ]);
      
      adminCargo = cargoResult;
      console.log('✅ Cargo de Administrador criado com sucesso!');
    } else {
      console.log('📋 Cargo de Administrador já existe.');
    }

    const cargoAdminId = adminCargo.rows[0].id;

    // 2. Verificar se já existe um usuário administrador
    const existingAdmin = await db.query(
      'SELECT * FROM usuarios WHERE email = $1',
      ['admin@sistema.com']
    );

    if (existingAdmin.rows.length > 0) {
      console.log('👤 Usuário administrador já existe!');
      console.log('📧 Email: admin@sistema.com');
      console.log('🔑 Senha: admin123');
      
      // Verificar se já tem o cargo atribuído
      const hasAdminRole = await db.query(`
        SELECT * FROM usuario_cargos 
        WHERE usuario_id = $1 AND cargo_id = $2
      `, [existingAdmin.rows[0].id, cargoAdminId]);

      if (hasAdminRole.rows.length === 0) {
        // Atribuir cargo de administrador
        await db.query(`
          INSERT INTO usuario_cargos (usuario_id, cargo_id)
          VALUES ($1, $2)
        `, [existingAdmin.rows[0].id, cargoAdminId]);
        console.log('✅ Cargo de administrador atribuído ao usuário existente!');
      }

      return existingAdmin.rows[0];
    }

    // 3. Criar hash da senha
    console.log('🔐 Gerando hash da senha...');
    const password = 'admin123';
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);

    // 4. Criar usuário administrador
    console.log('👤 Criando usuário administrador...');
    const userResult = await db.query(`
      INSERT INTO usuarios (nome, email, password_hash, telefone, departamento, esta_ativo)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `, [
      'Administrador do Sistema',
      'admin@sistema.com',
      password_hash,
      '(11) 99999-0000',
      'Administração',
      true
    ]);

    const adminUser = userResult.rows[0];
    console.log('✅ Usuário administrador criado com sucesso!');

    // 5. Atribuir cargo de administrador ao usuário
    console.log('🔗 Atribuindo cargo de administrador...');
    await db.query(`
      INSERT INTO usuario_cargos (usuario_id, cargo_id)
      VALUES ($1, $2)
    `, [adminUser.id, cargoAdminId]);

    console.log('✅ Cargo de administrador atribuído com sucesso!');

    // 6. Criar outros cargos básicos se não existirem
    await createBasicRoles();

    // 7. Exibir informações de login
    console.log('\n🎉 USUÁRIO ADMINISTRADOR CRIADO COM SUCESSO!');
    console.log('=' .repeat(50));
    console.log('📧 Email: admin@sistema.com');
    console.log('🔑 Senha: admin123');
    console.log('👤 Nome: Administrador do Sistema');
    console.log('🏢 Departamento: Administração');
    console.log('📱 Telefone: (11) 99999-0000');
    console.log('🎯 Cargo: Administrador (Nível 10)');
    console.log('🆔 ID: ' + adminUser.id);
    console.log('=' .repeat(50));
    console.log('🌐 Acesse: http://localhost:3000/login');
    console.log('');

    return adminUser;

  } catch (error) {
    console.error('❌ Erro ao criar usuário administrador:', error);
    throw error;
  }
}

async function createBasicRoles() {
  console.log('📋 Verificando cargos básicos...');

  const basicRoles = [
    {
      nome: 'Gerente',
      descricao: 'Pode gerenciar reservas e usuários do seu departamento',
      nivel_permissao: 7
    },
    {
      nome: 'Moderador',
      descricao: 'Pode gerenciar reservas e salas',
      nivel_permissao: 5
    },
    {
      nome: 'Usuário',
      descricao: 'Pode fazer reservas e gerenciar suas próprias reservas',
      nivel_permissao: 1
    }
  ];

  for (const role of basicRoles) {
    const existing = await db.query(
      'SELECT * FROM cargos WHERE nome = $1',
      [role.nome]
    );

    if (existing.rows.length === 0) {
      await db.query(`
        INSERT INTO cargos (nome, descricao, nivel_permissao)
        VALUES ($1, $2, $3)
      `, [role.nome, role.descricao, role.nivel_permissao]);
      
      console.log(`✅ Cargo "${role.nome}" criado!`);
    } else {
      console.log(`📋 Cargo "${role.nome}" já existe.`);
    }
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  createAdminUser()
    .then(() => {
      console.log('🎯 Script executado com sucesso!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Erro na execução:', error);
      process.exit(1);
    });
}

module.exports = { createAdminUser, createBasicRoles };
