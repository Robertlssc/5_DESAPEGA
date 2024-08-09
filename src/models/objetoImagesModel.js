import conn from "../config/conn.js";

const tabelaObjetoImagens = /*sql*/ `
    CREATE TABLE IF NOT EXISTS objeto_images(
        image_id VARCHAR(60) PRIMARY KEY,
        image_path  VARCHAR(255) NOT NULL,
        objeto_id   VARCHAR(60) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (objeto_id) REFERENCES objetos(objeto_id)
    )
`;
conn.query(tabelaObjetoImagens, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Tabela [objeto_images] criado com sucesso!");
});
