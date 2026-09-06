# Supabase 설정 — 설치 화면 캡쳐 인증 기능

수강생이 폰에 설치한 PWA 앱 화면을 캡쳐해 올리고, 관리자가 관제탑에서 확인하는 기능을 위해
**Supabase 대시보드 → SQL Editor** 에서 아래 SQL을 한 번만 실행하면 됩니다.

> ⚠️ SQL Editor에는 아래 코드블록 안의 **SQL만** 붙여넣으세요. 이 문서 전체를 붙여넣으면
> `syntax error at or near "##"` 에러가 납니다.

## 실행할 SQL (전체 복붙, 여러 번 실행해도 안전)

```sql
-- 1) students 테이블에 컬럼 추가
alter table public.students
  add column if not exists install_screenshot_url text;

-- 2) Storage 버킷 생성 (공개)
insert into storage.buckets (id, name, public)
values ('install-screenshots', 'install-screenshots', true)
on conflict (id) do update set public = true;

-- 3) Storage 정책 (익명 업로드/덮어쓰기/조회 허용)
drop policy if exists "install screenshots insert" on storage.objects;
drop policy if exists "install screenshots update" on storage.objects;
drop policy if exists "install screenshots read" on storage.objects;

create policy "install screenshots insert"
  on storage.objects for insert
  to anon, authenticated
  with check (bucket_id = 'install-screenshots');

create policy "install screenshots update"
  on storage.objects for update
  to anon, authenticated
  using (bucket_id = 'install-screenshots')
  with check (bucket_id = 'install-screenshots');

create policy "install screenshots read"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'install-screenshots');
```

실행 후 `Success. No rows returned` 가 나오면 완료입니다.

### 메모

- `students` 테이블은 이미 Realtime에 게시되어 있어, `install_screenshot_url` 변경도
  관리자 관제탑에 자동으로 실시간 반영됩니다. 추가 설정 불필요.
- 새 환경변수는 필요 없습니다. 기존 `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` 그대로 사용.
- 강의용 도구라 익명 업로드를 허용합니다. 운영 환경에서 더 엄격히 제한하려면
  파일명 prefix(`{studentId}-`)나 인증 사용자 기준으로 정책을 좁히세요.

## 동작 확인

**수강생 (폰):**

1. 폰에 PWA 설치 → 앱 실행 화면 스크린샷 (폰 사진함에 저장)
2. 폰 브라우저로 **`<사이트주소>/capture`** 접속 (모바일 전용 화면)
3. 본인 이름 선택
4. `📸 사진 전송하기` → 사진함에서 스크린샷 선택 → 선택 즉시 자동 업로드 → `✅ 전송 완료`

**관리자 (관제탑):**

- 해당 수강생 행에 `📸 설치화면` 버튼이 나타남 → 클릭 시 모달(라이트박스)로 이미지 확대
- 수강생 진행 상황을 `초기화`하면 캡쳐 URL 기록도 함께 삭제됨
