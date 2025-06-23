-- === 0. HAPUS STRUKTUR LAMA (jika ada) ===
-- Menghapus tabel jika sudah ada untuk memastikan script berjalan dari awal yang bersih.
-- CASCADE akan menghapus semua objek yang bergantung pada tabel ini (seperti foreign key dan trigger).
DROP TABLE IF EXISTS followers, comments, likes, stories, posts, users CASCADE;
DROP FUNCTION IF EXISTS update_updated_at_column CASCADE;


-- === 1. BUAT STRUKTUR TABEL BARU ===

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    bio TEXT,
    profile_picture_url VARCHAR(500),
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    caption TEXT,
    image_url VARCHAR(500) NOT NULL,
    location VARCHAR(255),
    likes_count INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create stories table
CREATE TABLE IF NOT EXISTS stories (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    image_url VARCHAR(500) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create likes table
CREATE TABLE IF NOT EXISTS likes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, post_id)
);

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create followers table
CREATE TABLE IF NOT EXISTS followers (
    id SERIAL PRIMARY KEY,
    follower_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    following_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(follower_id, following_id),
    CHECK (follower_id != following_id)
);

-- Create indexes for better performance
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_stories_user_id ON stories(user_id);
CREATE INDEX idx_likes_post_id ON likes(post_id);
CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_followers_follower_id ON followers(follower_id);
CREATE INDEX idx_followers_following_id ON followers(following_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON comments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


-- === 2. ISI DATA DUMMY ===

-- INSERT USERS
-- (Password untuk semua pengguna adalah '123')
INSERT INTO users (username, email, password_hash, full_name, bio, profile_picture_url, is_verified)
VALUES 
('budi_santoso', 'budi@example.com', '123', 'Budi Santoso', 'Loves hiking and photography. 🏔️', 'https://i.pravatar.cc/150?u=1', true),
('siti_rahayu', 'siti@example.com', '$2a$10$BSyL/l5a.v7o8w.m4n3p.O.h6i5e.n4o.p3q2r.s1t2u', 'Siti Rahayu', 'Food blogger from Jakarta. 🍜', 'https://i.pravatar.cc/150?u=2', false),
('eko_wijoyo', 'eko@example.com', '$2a$10$BSyL/l5a.v7o8w.m4n3p.O.h6i5e.n4o.p3q2r.s1t2u', 'Eko Wijoyo', 'Digital nomad exploring SEA. 💻✈️', 'https://i.pravatar.cc/150?u=3', true),
('dewi_lestari', 'dewi@example.com', '$2a$10$BSyL/l5a.v7o8w.m4n3p.O.h6i5e.n4o.p3q2r.s1t2u', 'Dewi Lestari', 'Artist and musician. 🎨🎶', 'https://i.pravatar.cc/150?u=4', false),
('agus_setiawan', 'agus@example.com', '$2a$10$BSyL/l5a.v7o8w.m4n3p.O.h6i5e.n4o.p3q2r.s1t2u', 'Agus Setiawan', 'Tech enthusiast and coffee lover.', 'https://i.pravatar.cc/150?u=5', false);

-- INSERT POSTS
INSERT INTO posts (user_id, caption, image_url, location)
VALUES
(1, 'Puncak Rinjani, pemandangan yang tak terlupakan!', 'https://picsum.photos/id/1015/600/600', 'Lombok, Indonesia'),
(2, 'Nasi Goreng Gila terenak di Jakarta! Wajib coba.', 'https://picsum.photos/id/1080/600/600', 'Jakarta, Indonesia'),
(3, 'Work from paradise. Bali never disappoints.', 'https://picsum.photos/id/1018/600/600', 'Canggu, Bali'),
(4, 'Sketsa baru untuk project lukisan berikutnya.', 'https://picsum.photos/id/102/600/600', 'Yogyakarta, Indonesia'),
(5, 'Review gadget terbaru sudah tayang di channel YouTube-ku!', 'https://picsum.photos/id/0/600/600', 'Bandung, Indonesia'),
(1, 'Senja di danau. Tenang dan damai.', 'https://picsum.photos/id/1039/600/600', 'Jawa Barat, Indonesia'),
(2, 'Sate Padang yang melegenda.', 'https://picsum.photos/id/218/600/600', 'Padang, Indonesia');

-- INSERT FOLLOWERS
INSERT INTO followers (follower_id, following_id)
VALUES
(1, 2), (1, 3),                     -- Budi follows Siti and Eko
(2, 1), (2, 4),                     -- Siti follows Budi and Dewi
(3, 1), (3, 2), (3, 4), (3, 5),      -- Eko follows everyone
(4, 5),                             -- Dewi follows Agus
(5, 1), (5, 3);                     -- Agus follows Budi and Eko

-- INSERT STORIES
INSERT INTO stories (user_id, image_url, expires_at)
VALUES
(1, 'https://picsum.photos/id/10/400/800', NOW() + INTERVAL '24 hours'),
(2, 'https://picsum.photos/id/20/400/800', NOW() + INTERVAL '24 hours'),
(3, 'https://picsum.photos/id/30/400/800', NOW() + INTERVAL '24 hours'),
(5, 'https://picsum.photos/id/40/400/800', NOW() + INTERVAL '24 hours');

-- INSERT LIKES
INSERT INTO likes (user_id, post_id)
VALUES
(1, 2), (1, 3), (1, 7),
(2, 1), (2, 3),
(3, 1), (3, 2), (3, 4), (3, 5),
(4, 3), (4, 5),
(5, 1), (5, 6);

-- INSERT COMMENTS
INSERT INTO comments (user_id, post_id, content)
VALUES
(2, 1, 'Keren banget, Mas Budi! Jadi pengen ke sana.'),
(3, 1, 'Mantap view-nya!'),
(1, 2, 'Wah, keliatannya enak banget! Bagi resep dong.'),
(4, 2, 'Lapaaar!'),
(5, 3, 'The dream life!'),
(1, 3, 'Asik banget, next time ajak-ajak ya!'),
(3, 4, 'Goood job! Ditunggu hasil akhirnya.');

-- UPDATE COUNTS IN POSTS TABLE
-- (Menjalankan ini memastikan data counts konsisten)
UPDATE posts SET likes_count = (SELECT COUNT(*) FROM likes WHERE likes.post_id = posts.id);
UPDATE posts SET comments_count = (SELECT COUNT(*) FROM comments WHERE comments.post_id = posts.id);


select * from users;

update users set password_hash = '$2b$10$pdl.QR6pqU5pCcQ5jM6g.OjzqsJxBFOssCreaVaIwOkk1jbyRjy3K' ;


-- === 1. MEMBUAT BUDI UNFOLLOW PENGGUNA LAIN ===
-- Hapus semua relasi di mana 'budi_santoso' (user_id = 1) menjadi follower.
-- Ini akan membuat postingan dari pengguna lain muncul di explore feed Budi.
DELETE FROM followers WHERE follower_id = 1;

-- === 2. MENAMBAHKAN LEBIH BANYAK POSTINGAN DARI PENGGUNA LAIN ===
-- Menambahkan lebih banyak variasi postingan agar explore feed lebih menarik.
INSERT INTO posts (user_id, caption, image_url, location)
VALUES
(4, 'Lukisan cat minyak terbaru, terinspirasi dari senja.', 'https://picsum.photos/id/119/600/600', 'Studio'),
(5, 'Mencoba resep kopi baru pagi ini. #coffee', 'https://picsum.photos/id/30/600/600', 'Rumah'),
(3, 'Menemukan permata tersembunyi di sudut kota.', 'https://picsum.photos/id/122/600/600', 'Bangkok'),
(4, 'Warna-warni pasar terapung.', 'https://picsum.photos/id/145/600/600', 'Thailand'),
(5, 'Setup meja kerja minimalis untuk produktivitas maksimal.', 'https://picsum.photos/id/175/600/600', 'WFH'),
(2, 'Manisnya dessert hari ini!', 'https://picsum.photos/id/219/600/600', 'Jakarta'),
(3, 'Arsitektur modern di tengah kota tua.', 'https://picsum.photos/id/180/600/600', 'Singapura'),
(4, 'Mengejar matahari terbit.', 'https://picsum.photos/id/200/600/600', 'Bromo'),
(2, 'Ramen night!', 'https://picsum.photos/id/222/600/600', 'Tokyo'),
(5, 'Buku baru, petualangan baru.', 'https://picsum.photos/id/249/600/600', 'Perpustakaan'),
(3, 'Jalan-jalan sore di taman.', 'https://picsum.photos/id/301/600/600', 'Kyoto'),
(2, 'Akhir pekan dihabiskan dengan baik.', 'https://picsum.photos/id/311/600/600', 'Pantai'),
(4, 'Detail kecil yang membuat perbedaan.', 'https://picsum.photos/id/322/600/600', 'Museum'),
(5, 'Coding sampai larut malam.', 'https://picsum.photos/id/338/600/600', 'Kantor'),
(3, 'Hijaunya alam selalu menenangkan.', 'https://picsum.photos/id/342/600/600', 'Ubud'),
(2, 'Pizza untuk makan malam.', 'https://picsum.photos/id/355/600/600', 'Rumah'),
(4, 'Koleksi kamera vintage.', 'https://picsum.photos/id/366/600/600', 'Koleksi Pribadi'),
(5, 'Pemandangan dari jendela pesawat.', 'https://picsum.photos/id/377/600/600', 'Di Atas Awan'),
(3, 'Seni jalanan yang kreatif.', 'https://picsum.photos/id/401/600/600', 'Melbourne'),
(2, 'Hidangan laut segar langsung dari nelayan.', 'https://picsum.photos/id/411/600/600', 'Jimbaran'),
(4, 'Momen refleksi di tepi danau.', 'https://picsum.photos/id/422/600/600', 'Danau Toba'),
(5, 'Eksperimen dengan fotografi makro.', 'https://picsum.photos/id/433/600/600', 'Taman'),
(3, 'Suasana pasar malam yang ramai.', 'https://picsum.photos/id/444/600/600', 'Taipei'),
(2, 'Membuat kue untuk orang tersayang.', 'https://picsum.photos/id/455/600/600', 'Dapur');


-- === 3. UPDATE COUNTS (PENTING) ===
-- Menjalankan ini lagi untuk memastikan likes_count dan comments_count tetap konsisten
-- setelah kita mungkin menghapus dan menambah data.
UPDATE posts SET likes_count = (SELECT COUNT(*) FROM likes WHERE likes.post_id = posts.id);
UPDATE posts SET comments_count = (SELECT COUNT(*) FROM comments WHERE comments.post_id = posts.id);


--
-- === 1. MENAMBAHKAN PENGGUNA BARU (CAHYO) ===
-- Menambahkan pengguna baru dengan id 7. Password-nya juga '123'.
INSERT INTO users (id, username, email, password_hash, full_name, bio, profile_picture_url, is_verified)
VALUES 
(7, 'cahyo_nugroho', 'cahyo@example.com', '$2a$10$HPI74d3d.E4wz0pL9KzY0.41nSgajx093J1tGPDxWj3wL7aC.N.i.', 'Cahyo Nugroho', 'Street photographer and urban explorer.', 'https://i.pravatar.cc/150?u=7', true)
ON CONFLICT (id) DO NOTHING;

-- === 2. MEMBUAT BUDI MENGIKUTI CAHYO ===
-- Budi (user_id = 1) akan mengikuti Cahyo (user_id = 7).
-- Ini akan membuat postingan Cahyo muncul di Beranda Budi.
INSERT INTO followers (follower_id, following_id)
VALUES (1, 7)
ON CONFLICT (follower_id, following_id) DO NOTHING;

-- === 3. MENAMBAHKAN POSTINGAN & STORY UNTUK CAHYO ===
INSERT INTO posts (user_id, caption, image_url, location)
VALUES
(7, 'Sudut kota yang terlupakan.', 'https://picsum.photos/id/501/600/600', 'Surabaya'),
(7, 'Garis-garis arsitektur.', 'https://picsum.photos/id/502/600/600', 'Jakarta'),
(7, 'Malam di persimpangan.', 'https://picsum.photos/id/503/600/600', 'Yogyakarta'),
(7, 'Refleksi di genangan air hujan.', 'https://picsum.photos/id/504/600/600', 'Bandung');

INSERT INTO stories (user_id, image_url, expires_at)
VALUES
(7, 'https://picsum.photos/id/600/400/800', NOW() + INTERVAL '24 hours');


-- === 4. MENAMBAHKAN LEBIH BANYAK POSTINGAN DARI PENGGUNA LAIN (untuk Explore) ===
-- Menambahkan lebih banyak variasi postingan agar explore feed tetap menarik.
INSERT INTO posts (user_id, caption, image_url, location)
VALUES
(4, 'Lukisan cat minyak terbaru, terinspirasi dari senja.', 'https://picsum.photos/id/119/600/600', 'Studio'),
(5, 'Mencoba resep kopi baru pagi ini. #coffee', 'https://picsum.photos/id/30/600/600', 'Rumah'),
(3, 'Menemukan permata tersembunyi di sudut kota.', 'https://picsum.photos/id/122/600/600', 'Bangkok'),
(4, 'Warna-warni pasar terapung.', 'https://picsum.photos/id/145/600/600', 'Thailand'),
(5, 'Setup meja kerja minimalis untuk produktivitas maksimal.', 'https://picsum.photos/id/175/600/600', 'WFH'),
(2, 'Manisnya dessert hari ini!', 'https://picsum.photos/id/219/600/600', 'Jakarta'),
(3, 'Arsitektur modern di tengah kota tua.', 'https://picsum.photos/id/180/600/600', 'Singapura'),
(4, 'Mengejar matahari terbit.', 'https://picsum.photos/id/200/600/600', 'Bromo'),
(2, 'Ramen night!', 'https://picsum.photos/id/222/600/600', 'Tokyo'),
(5, 'Buku baru, petualangan baru.', 'https://picsum.photos/id/249/600/600', 'Perpustakaan'),
(3, 'Jalan-jalan sore di taman.', 'https://picsum.photos/id/301/600/600', 'Kyoto'),
(2, 'Akhir pekan dihabiskan dengan baik.', 'https://picsum.photos/id/311/600/600', 'Pantai'),
(4, 'Detail kecil yang membuat perbedaan.', 'https://picsum.photos/id/322/600/600', 'Museum'),
(5, 'Coding sampai larut malam.', 'https://picsum.photos/id/338/600/600', 'Kantor'),
(3, 'Hijaunya alam selalu menenangkan.', 'https://picsum.photos/id/342/600/600', 'Ubud'),
(2, 'Pizza untuk makan malam.', 'https://picsum.photos/id/355/600/600', 'Rumah'),
(4, 'Koleksi kamera vintage.', 'https://picsum.photos/id/366/600/600', 'Koleksi Pribadi'),
(5, 'Pemandangan dari jendela pesawat.', 'https://picsum.photos/id/377/600/600', 'Di Atas Awan'),
(3, 'Seni jalanan yang kreatif.', 'https://picsum.photos/id/401/600/600', 'Melbourne'),
(2, 'Hidangan laut segar langsung dari nelayan.', 'https://picsum.photos/id/411/600/600', 'Jimbaran'),
(4, 'Momen refleksi di tepi danau.', 'https://picsum.photos/id/422/600/600', 'Danau Toba'),
(5, 'Eksperimen dengan fotografi makro.', 'https://picsum.photos/id/433/600/600', 'Taman'),
(3, 'Suasana pasar malam yang ramai.', 'https://picsum.photos/id/444/600/600', 'Taipei'),
(2, 'Membuat kue untuk orang tersayang.', 'https://picsum.photos/id/455/600/600', 'Dapur');


-- === 5. UPDATE COUNTS (PENTING) ===
-- Menjalankan ini lagi untuk memastikan likes_count dan comments_count tetap konsisten
-- setelah kita mungkin menghapus dan menambah data.
UPDATE posts SET likes_count = (SELECT COUNT(*) FROM likes WHERE likes.post_id = posts.id);
UPDATE posts SET comments_count = (SELECT COUNT(*) FROM comments WHERE comments.post_id = posts.id);

select * from stories;

