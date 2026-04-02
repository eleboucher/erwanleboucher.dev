wkd_hash := "ufrha4dbknbcrp9gi6jf3mf7f4u9f4ku"
wkd_uid := "erwan@erwanleboucher.dev"
wkd_direct := "public/.well-known/openpgpkey/hu/" + wkd_hash
wkd_advanced := "public/.well-known/openpgpkey/erwanleboucher.dev/hu/" + wkd_hash

# Update WKD public key from local GPG keyring
update-wkd:
    gpg --export {{ wkd_uid }} > {{ wkd_direct }}
    cp {{ wkd_direct }} {{ wkd_advanced }}
    @echo "WKD key updated ($(wc -c < {{ wkd_direct }}) bytes)"
